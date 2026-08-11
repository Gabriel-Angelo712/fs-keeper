import os from "node:os";
import fs from "node:fs/promises";
import { join } from "node:path";
import { DIRECTORY } from "../utils/utills.js";
import { info } from "node:console";

export default class Storage {
  #storageDir;
  constructor() {}

  get #os() {
    return os.platform();
  }

  #storageDirectory() {
    if (this.#os === "win32") {
      this.#storageDir =
        join(process.env.APPDATA, "fs-keeper", DIRECTORY) ??
        join(os.homedir(), "AppData/Roaming/fs-keeper", DIRECTORY);

      return this.#storageDir;
    }

    if (this.#os === "darwin") {
      this.#storageDir = join(
        os.homedir(),
        "~/Library/Application Support/fs-keeper",
        DIRECTORY,
      );

      return this.#storageDir;
    }

    this.#storageDir =
      join(process.env.XDG_DATA_HOME, DIRECTORY) ??
      join(os.homedir(), ".local/share/fs-keeper", DIRECTORY);

    return this.#storageDir;
  }

  get storageDirectory() {
    return this.#storageDirectory();
  }

  get storageFile() {
    return join(this.storageDirectory, "initial_state.json");
  }

  async create() {
    console.info(
      `[${new Date().toISOString()}] Info: creating storage directory at ${this.storageDirectory}`,
    );
    return await fs.mkdir(this.storageDirectory, { recursive: true });
  }

  snapPath(data) {
    return fs.appendFile(this.storageFile, JSON.stringify(data));
  }
}
