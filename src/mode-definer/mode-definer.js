import Log from "../logger/logger.js";

export default class ModeDefiner {
  constructor(args) {
    this.args = args;
  }

  isModeEnabled(modeName, fn) {
    let flag = this.args.some(
      (argument) => argument.toLowerCase() === `--${modeName}`,
    );

    if (flag) {
      new Log().info(`${modeName} mode set to abled`);
      fn();
      return true;
    }

    new Log().info(`${modeName} mode set to disabled`);
    return false;
  }
}
