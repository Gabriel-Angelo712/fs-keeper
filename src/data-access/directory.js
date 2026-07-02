import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";
import fs from "node:fs/promises";

export default class Directory {
  constructor(_path) {
    this.dirPath = _path;
  }

  async read() {
    new Log().info(`Starting fs-keeper with path: ${this.dirPath}`);
    new Log().info(`Reading directory ${this.dirPath}`);
    return await fs.readdir(this.dirPath, { recursive: true });
  }
}
