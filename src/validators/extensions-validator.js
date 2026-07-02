import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";

export default class ExtensionsValidator {
  #args;
  #flag;
  #openBracketIndex;
  #closeBracketIndex;
  constructor(args) {
    this.#args = args;
    try {
      this.#flag = ExtensionsValidator.extractFlag(this.#args);
    } catch (error) {
      throw new DomainError(error.message, error.statusCode);
    }
  }

  static extractFlag(argument) {
    return argument.find((arg) => arg.includes("--extensions"));
  }

  #isContentWrapped() {
    return this.#flag.includes("[") && this.#flag.includes("]");
  }

  #isExtensionArrayEmpty() {
    let openBracketIndex = this.#flag.indexOf("[");
    let closeBracketIndex = this.#flag.indexOf("]");
    let result = this.#flag.slice(openBracketIndex + 1, closeBracketIndex);
    return result.length === 0;
  }

  areExtensionsProvided() {
    let result = false;

    if (this.#flag) {
      result = this.#isContentWrapped() && !this.#isExtensionArrayEmpty();
      if (result) {
        new Log().info(`Extensions were correctly provided`);
        return result;
      }
      new Log().info(
        `Extensions were not correctly provided or extensions array is empty`,
      );
      new Log().info(`Using default extensions`);
      return result;
    }
    new Log().info(`Extensions were not provided or extensions array is empty`);
    new Log().info(`Using default extensions`);
    return result;
  }
}
