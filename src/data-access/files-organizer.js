import { DIRECTORY } from "../utils/utills.js";
import { join } from "node:path";
import { access, mkdir, copyFile, unlink } from "node:fs/promises";

export default class FilesOrganizer {
  #file;
  #destiny;
  #completeDestiny;
  constructor({ file, destiny }) {
    this.#file = file;
    this.#destiny = destiny;
    this.#completeDestiny = join(DIRECTORY, this.#destiny);

    this.CREATING_MESSAGE = `[${new Date().toISOString()}] Info: Creating ${this.#completeDestiny}`;
  }

  async #handleFileAccess() {
    return await access(this.#completeDestiny);
  }

  #handleFileUnlink() {
    return mkdir(this.#completeDestiny, { recursive: false });
  }

  async build() {
    await this.#handleFileAccess().catch(() => {
      console.info(this.CREATING_MESSAGE);
      this.#handleFileUnlink();
    });

    await copyFile(
      join(DIRECTORY, this.#file),
      join(this.#completeDestiny, this.#file),
    )
      .then(async () => {
        await unlink(join(DIRECTORY, this.#file));
      })
      .catch((err) => {
        if (err.code === "EPERM") {
          throw Error(
            `[${new Date().toISOString()}] Error: ungiven permission to operate at ${DIRECTORY}`,
          );
          return;
        }
        throw err;
      });
  }
}
