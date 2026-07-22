import DEFAULT_EXTENSIONS from "../entities/entities.js";
import { DIRECTORY } from "../data-access/directory-reader.js";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export default class Statistics {
  constructor() {}

  async #onLoadStats() {
    Object.values(DEFAULT_EXTENSIONS).forEach(async (obj) => {
      await readdir(join(DIRECTORY, obj.label))
        .then((files) => {
          console.log(
            `${files.length} files were moved to ${join(DIRECTORY, obj.label)}`,
          );
        })
        .catch((err) => {
          if (err.code === "ENOENT") {
            console.error(`Directory ${join(DIRECTORY, obj.label)} doesn´t exist`);
          }
        });
    });
  }

  async stats() {
    await this.#onLoadStats();
  }
}
