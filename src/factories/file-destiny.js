import DEFAULT_EXTENSIONS from "../entities/entities.js";
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
        console.error(
          `[${new Date().toISOString()}] Error: The extension wasn´t defined at FileDestiny instance definition`,
        );
        return;
      }

      throw err;
    }
  }

  get destiny() {
    return this.#DefineDestiny();
  }
}
