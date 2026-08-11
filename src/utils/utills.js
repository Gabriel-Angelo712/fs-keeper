import { access } from "node:fs/promises";

const ARGS = process.argv;
const DIRECTORY = ARGS.slice(2)[0];

const FLAGS = [
  "--restore",
  // "--simulation",
  "--set-backup",
  // "--restore-backup",
  // "--update-backup",
  // "--delete-backup",
  // "--help",
];

export default class ActiveModes {
  constructor() {}

  getModes(fn = () => {}) {
    let result = [];
    ARGS.some((element) => {
      if (FLAGS.includes(element)) {
        result.push(element.slice(2));
      }
    });

    return Promise.resolve(result, fn);
  }
}

export { DIRECTORY, FLAGS };
