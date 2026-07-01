import path from "node:path";
import DomainError from "./errors/domain-error.js";
import Log from "../logger/logger.js";

let args = null; //captura todos os argumentos passados na linha de comando
let dirPath = null;
try {
  args = process.argv.slice(2); //captura todos os argumentos passados na linha de comando
  dirPath = path.resolve(args[0]?.trim());
  new Log().info(`Arguments: ${args}`);
} catch (err) {
  throw new DomainError("No arguments provided. Please provide a path.", 400);
}

export { args, dirPath };
