import { cp } from "node:fs/promises";
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

  set() {
    return cp(DIRECTORY, this.#backupDirectory, { recursive: true });
  }
}
