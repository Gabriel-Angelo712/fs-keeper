import path from "node:path"

const args = process.argv.slice(2); //captura todos os argumentos passados na linha de comando
const dirPath = path.resolve(args[0].trim());
export { args, dirPath };
