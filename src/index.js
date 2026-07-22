#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/entities.js";
import { DATA_PROMISE, DIRECTORY } from "./data-access/directory-reader.js";

// const DIRECTORY = "C:/Users/Gabriel-Ângelo/Downloads/";

function getDestiny({ file, pattern }) {
  let destiny;
  Object.values(DEFAULT_EXTENSIONS).forEach((obj) => {
    obj.extensions.some((extension) => {
      if (extension === pattern) {
        destiny = obj.label;
      }
    });
  });

  return destiny ?? "Other";
}

async function handleOrganization({ file, destiny }) {
  const completeDestiny = join(DIRECTORY, destiny);

  await fs.access(completeDestiny).catch(() => {
    console.log(`Criando ${completeDestiny}`);
    fs.mkdir(completeDestiny, { recursive: false });
  });

  await fs
    .copyFile(join(DIRECTORY, file), join(completeDestiny, file))
    .then(async () => {
      await fs.unlink(join(DIRECTORY, file));
    });
}

DATA_PROMISE.then(async (data) => {
  for await (const element of data) {
    const { file, extension } = element;
    const destiny = getDestiny({ file: file, pattern: extension });

    try {
      await handleOrganization({ file: file, destiny: destiny });
    } catch (err) {
      continue;
    }
  }
});
