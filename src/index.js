#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/entities.js";

// const DIRECTORY = "C:/Users/Gabriel-Ângelo/Downloads/";
const DIRECTORY = process.argv.slice(2)[0]

let dataPromise = fs
  .readdir(DIRECTORY, { recursive: false })
  .then(function* (data) {
    for (const element of data) {
      const extension = extname(element);
      if (extension) {
        yield { file: element, extension: extension };
      }
    }
  });

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

dataPromise.then(async (data) => {
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
