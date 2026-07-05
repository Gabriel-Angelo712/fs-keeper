import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";
import path from "node:path";
import Directory from "../data-access/directory.js";
import { dirPath } from "../utils/chared.js";

export default class FileOrganizer {
  #fileIterator;
  #result;
  constructor(fileIterator, defaultExtensions) {
    this.#fileIterator = fileIterator;
    this.#result = [];
  }

  organizeByDefaultExtensions(defaultExtensions, fn = null) {
    const CURRENT_FILE = this.#fileIterator.next().value ?? "";

    if (path.extname(CURRENT_FILE)) {
      for (const extensionsObj of Object.values(defaultExtensions)) {
        extensionsObj.extensions.some((extension) => {
          if (extension === path.extname(CURRENT_FILE)) {
            this.#result.push({
              file: CURRENT_FILE,
              fileDirectory: extensionsObj.label,
            });
          }
        });
      }
    }
    if (!this.#fileIterator.next().done) {
      this.organizeByDefaultExtensions(defaultExtensions);
    }

    return this.#result;
  }

  organizeProvidedExtensions(file, fn) {}
}
