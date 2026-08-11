import DEFAULT_EXTENSIONS from "../entities/default-extensions.js";

export default class FileDestiny {
  #destiny;
  #file;
  #pattern;
  constructor({ file, pattern }) {
    this.#file = file;
    this.#pattern = pattern;
  }

  async #DefineDestiny() {
    try {
      Object.values(DEFAULT_EXTENSIONS).forEach((obj) => {
        obj.extensions.some((extension) => {
          if (extension === this.#pattern) {
            this.#destiny = obj.label;
          }
        });
      });
      return (await this.#destiny) ?? "Other";
    } catch (err) {
      if (!this.#pattern) {
        throw new Error(
          `[${new Date().toISOString()}] Error: Extension pattern was not defined for file classification.`,
        );
      }

      throw new Error(
        `[${new Date().toISOString()}] Error: Unable to determine destination for file.`,
      );
    }
  }

  get destiny() {
    return this.#DefineDestiny();
  }
}
