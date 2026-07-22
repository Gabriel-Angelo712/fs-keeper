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
    Object.values(DEFAULT_EXTENSIONS).forEach((obj) => {
      obj.extensions.some((extension) => {
        if (extension === this.#pattern) {
          this.#destiny = obj.label;
        }
      });
    });

    return await this.#destiny ?? "Other";
  }

  get destiny() {
    return this.#DefineDestiny();
  }
}
