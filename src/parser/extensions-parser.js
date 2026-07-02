import Log from "../logger/logger.js";
import DomainError from "../utils/errors/domain-error.js";
import ExtensionsValidator from "../validators/extensions-validator.js";

export default class ExtensionsParser {
  #args;
  #flag;
  constructor(args) {
    this.#args = args;
    this.#flag = ExtensionsValidator.extractFlag(this.#args);
  }

  parse() {
    new Log().info(`Parsing extensions...`);
    const extensionsArray = this.#flag
      .slice(this.#flag.indexOf("[") + 1, this.#flag.indexOf("]"))
      .split(" ");
    new Log().info(`Extensions Successfuly parsed`);
    new Log().info(`Parsed extensions: ${extensionsArray}`);
    return extensionsArray;
  }
}
