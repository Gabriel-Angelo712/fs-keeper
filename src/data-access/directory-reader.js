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

  async get() {
    try {
      const data = await this.#handleDirectoryReading();
      return data
        .filter((element) => extname(element))
        .map((file) => ({ file, extension: extname(file) }));
    } catch (err) {
      this.#handleErrors(err);
    }
  }
}
