#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import Log from "./logger/logger.js";
import { args, dirPath } from "./utils/chared.js";
import Validator from "./validators/args-validator.js";
import ExtensionsParser from "./parser/extensions-parser.js";
import Directory from "./data-access/directory.js";
import DirectoryValidator from "./validators/directory-validator.js";
import ModeDefiner from "./mode-definer/mode-definer.js";
import ExtensionsValidator from "./validators/extensions-validator.js";

const argsValidator = new Validator(args);
const extensionsValidator = new ExtensionsValidator(args);
const simulationMode = new ModeDefiner(args);
const restoreMode = new ModeDefiner(args);
const directoryValidator = new DirectoryValidator(dirPath);
const directory = new Directory(dirPath);
const paramsParser = new ExtensionsParser(args);

argsValidator.validateArguments(async () => {
  //Verificação de modos
  simulationMode.isModeEnabled("simulation");
  restoreMode.isModeEnabled("restore");
  //validação do diretório fornecido
  await directoryValidator.doesPathExist();
  await directoryValidator.isReadingAllowed();
  await directoryValidator.isWritingAllowed();
  //Verifica se a flag --extensions foi passada na chamada da CLI e valida a flag
  let hasExtensions = extensionsValidator.areExtensionsProvided();
  if (hasExtensions) {
    paramsParser.parse();
    directory.read();
    return;
  }
});
