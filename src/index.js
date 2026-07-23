#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/entities.js";
import { FILES_PROMISE, DIRECTORY } from "./data-access/directory-reader.js";
import FileDestiny from "./factories/file-destiny.js";
import FilesOrganizer from "./data-access/files-organizer.js";
import Statistics from "./statistics/stats.js";

FILES_PROMISE.then(async (files) => {
  try {
    for await (const fileObj of files) {
      const { file, extension } = fileObj;
      const destiny = await new FileDestiny({ file: file, pattern: extension })
        .destiny;

      const ORGANIZER = await new FilesOrganizer({
        file: file,
        destiny: destiny,
      });
      await ORGANIZER.build();
    }
  } catch (err) {
    if (!files) {
      console.error(
        `[${new Date().toISOString()}] Error: Unable to iterate in files from ${DIRECTORY}`,
      );
      return;
    }
    throw err;
  }
  await new Statistics().stats();
});
