import fs from "node:fs/promises";
import { extname } from "node:path";

const DIRECTORY = process.argv.slice(2)[0];
const FILES_PROMISE = fs
  .readdir(DIRECTORY, { recursive: false })
  .then(function* (data) {
    for (const element of data) {
      const extension = extname(element);
      if (extension) {
        yield { file: element, extension: extension };
      }
    }
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.error(
        `[${new Date().toISOString()}] Error: Directory ${DIRECTORY} doesn´t exist`,
      );
      return;
    }
    if (err.code === "ENOTDIR") {
      console.error(
        `[${new Date().toISOString()}] Error: Path ${DIRECTORY} must be an existent directory`,
      );
      return;
    }

    throw err;
  });

export { FILES_PROMISE, DIRECTORY };
