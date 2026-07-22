import fs from "node:fs/promises";
import { extname } from "node:path";

const DIRECTORY = process.argv.slice(2)[0];

const DATA_PROMISE = fs
  .readdir(DIRECTORY, { recursive: false })
  .then(function* (data) {
    for (const element of data) {
      const extension = extname(element);
      if (extension) {
        yield { file: element, extension: extension };
      }
    }
  });

export { DATA_PROMISE, DIRECTORY };
