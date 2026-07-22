#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/entities.js";
import { DATA_PROMISE, DIRECTORY } from "./data-access/directory-reader.js";
import FileDestiny from "./factories/file-destiny.js";

async function handleOrganization({ file, destiny }) {
  const completeDestiny = join(DIRECTORY, destiny);

  await fs.access(completeDestiny).catch(() => {
    console.log(`Creating ${completeDestiny}`);
    console.log(`Moving files to ${completeDestiny}`);
    fs.mkdir(completeDestiny, { recursive: false });
  });

  await fs
    .copyFile(join(DIRECTORY, file), join(completeDestiny, file))
    .then(async () => {
      await fs.unlink(join(DIRECTORY, file));
    });
}

DATA_PROMISE.then(async (data) => {
  try {
    for await (const element of data) {
      const { file, extension } = element;
      const destiny = await new FileDestiny({ file: file, pattern: extension })
        .destiny;

      await handleOrganization({ file: file, destiny: destiny });
    }
  } catch (err) {
    if (!data) {
      console.log(`Unable to iterate in files from ${DIRECTORY}`);
      return;
    }
    throw err;
  }
});
