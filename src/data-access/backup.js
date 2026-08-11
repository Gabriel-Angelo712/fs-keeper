import { cp, access, rm } from "node:fs/promises";
import Storage from "./store-directory.js";
import { join } from "node:path";
import { DIRECTORY } from "../utils/utills.js";

export default class Backup extends Storage {
  constructor() {
    super();
  }

  get #backupDirectory() {
    return join(super.storageDirectory, "/backup");
  }

  async set() {
    try {
      await cp(DIRECTORY, this.#backupDirectory, { recursive: true });
      console.info(
        `[${new Date().toISOString()}] Info: Backup created/updated successfully`,
      );
      return true;
    } catch (err) {
      throw new Error(
        `[${new Date().toISOString()}] Error: Unable to create backup. Check permissions and try again.`,
      );
    }
  }

  async update() {
    try {
      await access(this.#backupDirectory);
      return await this.set();
    } catch (err) {
      if (err.code === "ENOENT") {
        console.info(
          "Backup directory not found. Run fs-keeper <directory> with --set-backup before using --update-backup.",
        );
        return false;
      }

      throw new Error(
        `[${new Date().toISOString()}] Error: Unable to access backup directory.`,
      );
    }
  }

  delete() {
    return rm(this.#backupDirectory, { recursive: true })
      .then(() => console.info("backup successfuly deleted"))
      .catch((err) => {
        throw err;
        console.error(
          `[${new Date().toISOString()}] Error: Unable to delete backup. Ensure the backup directory exists and you have permission to remove it.`,
        );
        process.exitCode = 1;
      });
  }
}
