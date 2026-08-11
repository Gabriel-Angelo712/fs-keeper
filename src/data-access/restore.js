import { join, dirname } from "node:path";
import { DIRECTORY } from "../utils/utills.js";
import Storage from "./store-directory.js";
import fs from "node:fs/promises";

export default class Restore extends Storage {
  constructor() {
    super();
  }

  async #handleReading() {
    try {
      return await fs.readFile(this.storageFile, "utf-8");
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new Error(
          `[${new Date().toISOString()}] Error: Restore data not found. Run fs-keeper <directory> to organize the directory before using --restore.`,
        );
      }

      throw new Error(
        `[${new Date().toISOString()}] Error: Unable to read restore data. Ensure the initial organization step completed successfully before restoring.`,
      );
    }
  }

  #handleCopy({ from, to }) {
    return fs.copyFile(from, to, fs.constants.COPYFILE_FICLONE);
  }

  #handleDeletion(path) {
    return fs.unlink(path);
  }

  async #handleDirectoriesDeletion(pathsSet) {
    if (!pathsSet.size) {
      return false;
    }

    const directories = [...pathsSet].sort((a, b) => b.length - a.length);

    await Promise.all(
      directories.map(async (path) => {
        try {
          await fs.rm(path);
        } catch (err) {
          if (err.code === "ENOTEMPTY" || err.code === "ENOENT") {
            return;
          }

          throw new Error(
            `[${new Date().toISOString()}] Error: Unable to remove directory ${path}.`,
          );
        }
      }),
    );

    return true;
  }

  #dataParser(data) {
    try {
      return JSON.parse(data);
    } catch {
      throw new Error(
        `[${new Date().toISOString()}] Error: Restore file is corrupted or contains invalid JSON.`,
      );
    }
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

    await Promise.all(restoreOperations).catch(() => {
      throw new Error(
        `[${new Date().toISOString()}] Error: Unable to complete restore operation.`,
      );
    });
    await this.#handleDirectoriesDeletion(pathsToDelete);

    await fs.unlink(this.storageFile).catch(() => {});
    console.info("Restore process successfuly finished");
  }
}
