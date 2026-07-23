import { DIRECTORY } from "./directory-reader.js";
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

    this.MESSAGES = {
      creating: console.info(
        `[${new Date().toISOString()}] Info: Creating ${this.#completeDestiny}`,
      ),
      moving: console.info(
        `[${new Date().toISOString()}] Info: Moving files to ${this.#completeDestiny}`,
      ),
    };
  }

  async #handleFileAccess() {
    return await access(this.#completeDestiny);
  }

  #handleFileUnlink() {
    return mkdir(this.#completeDestiny, { recursive: false });
  }

  async build() {
    await this.#handleFileAccess().catch(() => {
      this.MESSAGES.creating;
      this.MESSAGES.moving;
      this.#handleFileUnlink();
    });

    await copyFile(
      join(DIRECTORY, this.#file),
      join(this.#completeDestiny, this.#file),
    ).then(async () => {
      await unlink(join(DIRECTORY, this.#file));
    });
  }
}
