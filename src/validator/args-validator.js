import path from "node:path";
import fs from "node:fs/promises";
import DomainError from "../utils/errors/domain-error.js";
import Log from "../logger/logger.js";
import ModeDefiner from "../mode-definer/mode-definer.js";

export default class Validator {
  constructor(args, dirPath) {
    this.args = args;
    this.dirPath = dirPath;
  }

  // Private methods
  #areArgumentsProvided() {
    // Check if arguments are provided
    if (this.args.length === 0) {
      throw new DomainError(
        "No arguments provided. Please provide a path.",
        400,
      );
    }
  }

  async #doesPathExist() {
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

  async #isReadingAllowed() {
    try {
      await fs.access(this.dirPath, fs.constants.R_OK);
      new Log().info(`Read access validated for directory: ${this.dirPath}`);
    } catch (err) {
      throw new DomainError(err.message, 403);
    }
  }

  async #isWritingAllowed() {
    try {
      await fs.access(this.dirPath, fs.constants.W_OK);
      new Log().info(`write access validated for directory: ${this.dirPath}`);
    } catch (err) {
      throw new DomainError(err.message, 403);
    }
  }

  #isSimulationModeEnabled() {
    let simulationMode = new ModeDefiner(this.args);
    simulationMode.isModeEnabled("simulation");
  }

  #isRestoreModeEnabled() {
    let restoreMode = new ModeDefiner(this.args);
    restoreMode.isModeEnabled("restore");
  }

  //Method to validate the arguments (public)
  async validateArguments(fn) {
    try {
      this.#areArgumentsProvided();
      await this.#doesPathExist();
      await this.#isReadingAllowed();
      await this.#isWritingAllowed();
      this.#isSimulationModeEnabled();
      this.#isRestoreModeEnabled();
      fn();
    } catch (err) {
      throw err; //err is already an instance of DomainError
    }
  }
}
