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

  #isSimulationModeEnabled() {
    let simulationMode = new ModeDefiner(this.args);
    simulationMode.isModeEnabled("simulation");
  }

  #isRestoreModeEnabled() {
    let restoreMode = new ModeDefiner(this.args);
    restoreMode.isModeEnabled("restore");
  }

  //Method to validate the arguments (public)
  validateArguments(fn) {
    try {
      this.#areArgumentsProvided();
      this.#isSimulationModeEnabled();
      this.#isRestoreModeEnabled();
      fn();
    } catch (err) {
      throw err; //err is already an instance of DomainError
    }
  }
}
