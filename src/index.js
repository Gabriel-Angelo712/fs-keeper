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
import FileOrganizer from "./validators/file-organizer-validator.js";
import DEFAULT_EXTENSIONS from "./entities/entities.js";
import DomainError from "./utils/errors/domain-error.js";

const directory = new Directory(dirPath);
const argsValidator = new Validator(args);
const extensionsValidator = new ExtensionsValidator(args);
const simulationMode = new ModeDefiner(args);
const restoreMode = new ModeDefiner(args);
const directoryValidator = new DirectoryValidator(dirPath);
const extensionsParser = new ExtensionsParser(args);

argsValidator.validateArguments(async () => {
  //validação do diretório fornecido
  await directoryValidator.doesPathExist();
  await directoryValidator.isReadingAllowed();
  await directoryValidator.isWritingAllowed();

  //Verifica se a flag --extensions foi passada na chamada da CLI e valida a flag
  let hasExtensions = extensionsValidator.areExtensionsProvided();

  //Verificação de modos
  simulationMode.isModeEnabled("simulation", () => {});
  restoreMode.isModeEnabled("restore", () => {});

  const DIRECTORY_CONTENT = await directory.read();
  let demand = directory.demandDirectoryContent(DIRECTORY_CONTENT);
  const DIRECTORY_ITERATOR = demand(DIRECTORY_CONTENT);

  const fileOrganizerValidator = new FileOrganizer(DIRECTORY_ITERATOR);

  if (hasExtensions) {
    extensionsParser.parse();
    fileOrganizerValidator.organizeByProvidedExtensions();
    return;
  }

  const ContentArr =
    fileOrganizerValidator.organizeByDefaultExtensions(DEFAULT_EXTENSIONS);

  ContentArr.forEach((obj) => {
    directory
      .createFolder(obj.fileDirectory)
      .then((data) => new Log().info(`Diretory ${data} created successfuly`))
      .catch((err) => {
        throw new DomainError(err);
      });
  });

  return;
});
