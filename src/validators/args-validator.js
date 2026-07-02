import DomainError from "../utils/errors/domain-error.js";
import Log from "../logger/logger.js";

export default class Validator {
  constructor(args) {
    this.args = args;
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
    new Log().info(`Provided arguments: ${this.args}`);
  }

  //Method to validate the arguments (public)
  validateArguments(fn) {
    try {
      this.#areArgumentsProvided();
      fn();
    } catch (err) {
      throw err; //err is already an instance of DomainError
    }
  }
}
