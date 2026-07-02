import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";

export default class ExtensionsParser {
  #args;
  #flag;
  constructor(args) {
    this.#args = args;
    this.#flag = this.#extractFlag(this.#args);
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
    return result.length === 0 ? true : false;
  }

  parse() {
    new Log().info(`Parsing extensions...`);
    const extensionsArray = this.#flag
      .slice(this.openBracketIndex + 1, this.closeBracketIndex)
      .split(" ");
    new Log().info(`Extensions Successfuly parsed`);
    new Log().info(`Parsed extensions: ${extensionsArray}`);
    return extensionsArray;
  }

  areExtensionsProvided() {
    let result = false;

    if (this.#flag) {
      result =
        this.#isContentWrapped(this.#flag) &&
        !this.#isExtensionArrayEmpty(this.#flag);
      if (result) {
        this.openBracketIndex = this.#flag.indexOf("[");
        this.closeBracketIndex = this.#flag.indexOf("]");
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
