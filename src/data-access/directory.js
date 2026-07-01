import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";
import fs from "node:fs/promises";

export default class Directory {
  constructor(path) {
    this.dirPath = path;
  }

  async doesPathExist() {
    // Check if the first argument is an existing directory
    try {
      const stats = await fs.stat(this.dirPath);
      if (stats.isDirectory()) {
        new Log().info(`Validated directory: ${this.dirPath}`);
        return true;
      }

      throw new DomainError("Passed file path instead directory", 400);
    } catch (err) {
      throw new DomainError(err.message, 400);
    }
  }

  async isReadingAllowed() {
    try {
      await fs.access(this.dirPath, fs.constants.R_OK);
      new Log().info(`Read access validated for directory: ${this.dirPath}`);
    } catch (err) {
      throw new DomainError(err.message, 403);
    }
  }

  async isWritingAllowed() {
    try {
      await fs.access(this.dirPath, fs.constants.W_OK);
      new Log().info(`write access validated for directory: ${this.dirPath}`);
    } catch (err) {
      throw new DomainError(err.message, 403);
    }
  }
}
