import { join, dirname } from "node:path";
import { DIRECTORY } from "../utils/utills.js";
import Storage from "./store-directory.js";
import fs from "node:fs/promises";

const STORAGE = new Storage();

export default class Restore {
  constructor() {}

  #handleReading() {
    return fs.readFile(STORAGE.storageFile, "utf-8");
  }

  #handleCopy({ from, to }) {
    return fs.copyFile(from, to, fs.constants.COPYFILE_FICLONE);
  }

  #handleDeletion(path) {
    return fs.unlink(path);
  }

  async #handleDirectoriesDeletion(pathsSet) {
    if (pathsSet.size) {
      const directories = [...pathsSet].sort((a, b) => b.length - a.length);

      await Promise.all(
        directories.map(async (path) => {
          try {
            await fs.rmdir(path);
          } catch (err) {
            if (err.code === "ENOTEMPTY" || err.code === "ENOENT") {
              return;
            }
            throw err;
          }
        }),
      );

      return true;
    }

    console.log("Unable to delete organizer directories");
    return false;
  }

  #dataParser(data) {
    return JSON.parse(data);
  }

  async build() {
    const data = await this.#handleReading();
    const parsedDataArr = this.#dataParser(data);

    const pathsToDelete = new Set();

    const restoreOperations = parsedDataArr.map(async (pathsObj) => {
      pathsToDelete.add(dirname(pathsObj.to));
      await this.#handleCopy({ from: pathsObj.to, to: pathsObj.from });
      await this.#handleDeletion(pathsObj.to);
    });

    await Promise.all(restoreOperations);
    await this.#handleDirectoriesDeletion(pathsToDelete);
  }
}
