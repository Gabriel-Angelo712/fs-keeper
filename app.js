#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const dirPath = process.argv[2] ?? "./";

const extensions = {
  img: ["jpg", "jpeg", "png", "webp", "gif", "svg", "ico"],
  src: ["exe", "js", "php"],
  video: ["mp4", "mov", "avi", "webm"],
  text: ["txt", "md", "pdf", "html", "json", "xml", "log", "csv"],
};

console.log(dirPath);