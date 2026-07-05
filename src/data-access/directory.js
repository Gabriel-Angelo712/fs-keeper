import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export default class Directory {
  constructor(_path) {
    this.dirPath = _path;
  }

  async read() {
    new Log().info(`Starting fs-keeper with path: ${this.dirPath}`);
    new Log().info(`Reading directory ${this.dirPath}`);
    return await fs.readdir(this.dirPath, { recursive: true });
  }

  demandDirectoryContent() {
    return function* demand(args) {
      for (const argument of args) {
        yield argument;
      }
    };
  }

  organize() {}

  async #doesDirectoryExists(_path) {
    return await fs.access(_path);
  }

  async createFolder(_path) {
    _path = path.join(this.dirPath, _path);
    return await this.#doesDirectoryExists(_path)
      .then(() => null)
      .catch(async () => {
        return await fs.mkdir(_path, { recursive: true });
      });
  }
}
