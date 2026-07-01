import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";

export default class ExtensionsParser {
  #args;
  constructor(args) {
    this.#args = args;
  }

  #extractFlag(args) {
    return args.find((arg) => arg.includes("--extensions"));
  }

  #isContentWrapped(arg) {
    return arg.includes("[") && arg.includes("]");
  }

  #isExtensionArrayEmpty(arg) {
    let openBracketIndex = arg.indexOf("[");
    let closeBracketIndex = arg.indexOf("]");
    let result = arg.slice(openBracketIndex, closeBracketIndex);
    return result.length === 0 ? false : true;
  }

  parse() {
    new Log().info("Parsing extensions...");
  }

  areExtensionsProvided(fn) {
    const FLAG = this.#extractFlag(this.#args);
    let result = false;

    if (FLAG) {
      result =
        this.#isContentWrapped(FLAG) && this.#isExtensionArrayEmpty(FLAG);
      if (result) {
        new Log().info("Extensions were correctly provided");
        return result;
      }
      new Log().info(
        "Extensions were not correctly provided or extensions array is empty",
      );
      new Log().info("Using default extensions");
      fn();
      return result;
    }
    new Log().info(
      "Extensions were not provided or extensions array is empty",
    );
    new Log().info("Using default extensions");
    fn();
    return result;
  }
}
