#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/entities.js";
import { DATA_PROMISE, DIRECTORY } from "./data-access/directory-reader.js";
import FileDestiny from "./factories/file-destiny.js";
import FilesOrganizer from "./data-access/files-organizer.js";

DATA_PROMISE.then(async (data) => {
  try {
    for await (const element of data) {
      const { file, extension } = element;
      const destiny = await new FileDestiny({ file: file, pattern: extension })
        .destiny;

      const ORGANIZER = await new FilesOrganizer({
        file: file,
        destiny: destiny,
      });
      await ORGANIZER.build();
    }
  } catch (err) {
    if (!data) {
      console.log(`Unable to iterate in files from ${DIRECTORY}`);
      return;
    }
    throw err;
  }
});
