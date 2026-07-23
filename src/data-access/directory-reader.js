import fs from "node:fs/promises";
import { extname } from "node:path";
import { DIRECTORY } from "../utils/utills.js";

export default class Files {
  constructor() {}

  #handleDirectoryReading() {
    return fs.readdir(DIRECTORY, { recursive: false });
  }

  #handleErrors(err) {
    if (err.code === "ENOENT") {
      throw Error(
        `[${new Date().toISOString()}] Error: Directory ${DIRECTORY} doesn´t exist`,
      );
      return;
    }
    if (err.code === "ENOTDIR") {
      throw Error(
        `[${new Date().toISOString()}] Error: Path ${DIRECTORY} must be an existent directory`,
      );
      return;
    }

    throw err;
  }

  get() {
    return this.#handleDirectoryReading()
      .then(function* (data) {
        for (const element of data) {
          const extension = extname(element);
          if (extension) {
            yield { file: element, extension: extension };
          }
        }
      })
      .catch((err) => {
        this.#handleErrors(err);
      });
  }
}
