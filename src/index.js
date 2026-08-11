#!/usr/bin/env node
import fs from "node:fs/promises";
import { extname, join } from "node:path";
import DEFAULT_EXTENSIONS from "./entities/default-extensions.js";
import Files from "./data-access/directory-reader.js";
import FileDestiny from "./factories/file-destiny.js";
import FilesOrganizer from "./data-access/files-organizer.js";
import ActiveModes, { DIRECTORY, FLAGS } from "./utils/utills.js";
import Statistics from "./statistics/stats.js";
import Storage from "./data-access/store-directory.js";
import { FILE } from "node:dns";
import Restore from "./data-access/restore.js";
import Backup from "./data-access/backup.js";

const UTIL = new ActiveModes();
const STORAGE = new Storage();
const FILES = new Files();
const RESTORE = new Restore();
const BACKUP = new Backup();

function handleErrors(files, err) {
  if (!files) {
    throw Error(
      `[${new Date().toISOString()}] Error: Unable to iterate in files from ${DIRECTORY}`,
    );
    return;
  }
  throw err;
}

async function handleFilesIteration(files) {
  let result = [];
  for await (const fileObj of files) {
    const { file, extension } = fileObj;
    const destiny = await new FileDestiny({
      file: file,
      pattern: extension,
    }).destiny;

    result.push({
      from: join(DIRECTORY, file),
      to: join(DIRECTORY, destiny, file),
    });

    const ORGANIZER = await new FilesOrganizer({
      file: file,
      destiny: destiny,
    });
    await ORGANIZER.build();
  }
  fs.access(STORAGE.storageFile).catch(() => STORAGE.snapPath(result));
}

fs.access(STORAGE.storageDirectory).catch(() => {
  STORAGE.create();
  console.info(
    `[${new Date().toISOString()}] Info: storage directory sucessfuly created`,
  );
});

UTIL.getModes().then((modesArr) => {
  if (modesArr.includes("restore")) {
    console.info(`[${new Date().toISOString()}] Info: restore mode abled`);
    console.info(
      `[${new Date().toISOString()}] Info: starting restore process`,
    );
    RESTORE.build();
    return;
  }

  if (modesArr.includes("simulation")) {
    console.info(`[${new Date().toISOString()}] Info: simulation mode abled`);
    return;
  }

  if (modesArr.includes("set-backup")) {
    console.info(
      `[${new Date().toISOString()}] Info: backup setting mode abled`,
    );

    BACKUP.set();
    return;
  }

  FILES.get().then(async (files) => {
    try {
      handleFilesIteration(files);
    } catch (err) {
      handleErrors(files, err);
    }
    await new Statistics().stats();
  });
});
