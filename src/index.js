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
import Restore from "./data-access/restore.js";
import Backup from "./data-access/backup.js";

const UTIL = new ActiveModes();
const STORAGE = new Storage();
const FILES = new Files();
const RESTORE = new Restore();
const BACKUP = new Backup();

function reportError(message) {
  const safeMessage = message
    ? String(message).replace(/[\r\n]+/g, " ")
    : "An unexpected error occurred.";

  console.error(`[${new Date().toISOString()}] Error: ${safeMessage}`);
  process.exitCode = 1;
}

process.on("uncaughtException", () => {
  reportError("Unexpected runtime error occurred.");
});

process.on("unhandledRejection", () => {
  reportError("Unhandled rejection occurred.");
});

function reportAndExitOnError(files) {
  if (!files) {
    reportError(
      `Unable to retrieve the files for directory ${DIRECTORY}. Check that the directory exists and you have read access.`,
    );
    return;
  }

  reportError("An unexpected error occurred while processing the file list.");
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

  await fs.access(STORAGE.storageFile).catch(async () => {
    await STORAGE.snapPath(result);
  });
}

fs.access(STORAGE.storageDirectory).catch(() => {
  STORAGE.create();
  console.info(
    `[${new Date().toISOString()}] Info: storage directory sucessfuly created`,
  );
});

UTIL.getModes().then(async (modesArr) => {
  if (modesArr.includes("restore")) {
    console.info(`[${new Date().toISOString()}] Info: restore mode abled`);
    console.info(
      `[${new Date().toISOString()}] Info: starting restore process`,
    );
    await RESTORE.build().catch(() =>
      reportError(
        "Unable to restore files. Verify restore data and directory structure before retrying.",
      ),
    );
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

    await BACKUP.set().catch(() =>
      reportError(
        "Unable to create backup. Check backup permissions and destination path.",
      ),
    );
    return;
  }

  if (modesArr.includes("delete-backup")) {
    console.info(
      `[${new Date().toISOString()}] Info: backup clearing mode abled`,
    );

    await BACKUP.delete();
    return;
  }

  if (modesArr.includes("update-backup")) {
    console.info(
      `[${new Date().toISOString()}] Info: backup updating mode abled`,
    );

    await BACKUP.update().catch(() =>
      reportError(
        "Unable to update backup. Ensure the backup directory exists and is accessible.",
      ),
    );
    return;
  }

  FILES.get()
    .then(async (files) => {
      try {
        await handleFilesIteration(files);
      } catch {
        reportError(
          "Unable to organize files. Check directory contents and permissions.",
        );
      }
      await new Statistics().stats();
    })
    .catch(() =>
      reportError(
        "Unable to read directory contents. Verify the directory path and try again.",
      ),
    );
});
