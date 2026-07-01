#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import Log from "./logger/logger.js";
import { args, dirPath } from "./utils/chared.js";
import Validator from "./validator/args-validator.js";
import ExtensionsParser from "./parser/extensions-parser.js";

const validator = new Validator(args, dirPath);
const paramsParser = new ExtensionsParser(args);

validator.validateArguments(() => {
  new Log().info(`Starting fs-keeper with path: ${args[0]}`);
  //Verifica se a flag --extensions foi passada na chamada da CLI e valida a flag
  paramsParser.areExtensionsProvided(() => {
    //Faz o parse das extensões enviadas via flag --extensions
    paramsParser.parse();
  });
});
