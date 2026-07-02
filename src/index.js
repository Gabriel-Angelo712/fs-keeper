#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import Log from "./logger/logger.js";
import { args, dirPath } from "./utils/chared.js";
import Validator from "./validator/args-validator.js";
import ExtensionsParser from "./parser/extensions-parser.js";
import Directory from "./data-access/directory.js";

const validator = new Validator(args, dirPath);
const directory = new Directory(dirPath);
const paramsParser = new ExtensionsParser(args);

validator.validateArguments(async () => {
  await directory.doesPathExist();
  await directory.isReadingAllowed();
  await directory.isWritingAllowed();
  //Verifica se a flag --extensions foi passada na chamada da CLI e valida a flag
  let hasExtensions = paramsParser.areExtensionsProvided();
  if (hasExtensions) {
    paramsParser.parse();
    directory.read();
    return;
  }
});
