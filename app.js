#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv;
//extensões predefinidas
const defaultExtensions = [
  { img: [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".ico"] },
  {
    dev: [".js", ".php", ".ts", ".jsx", ".py", ".yalm", ".yml", ".java", ".c", ".cs", ".cpp"],
  },
  { video: [".mp4", ".mov", ".avi", ".webm"] },
  { text: [".txt", ".md", ".pdf", ".html"] },
  { data: [".json", ".xml", ".log", ".csv", ".sql", ".db"] },
  { exec: [".exe", ".msi", ".apk", ".dmg"] },
  { compact: [".zip", ".rar", ".7z", ".tar", ".gz"] },
];

//Definição das variaves que alimentam o package
const dirPath = args[2]; //1
const inputExtensions = defineInputExtensionsArr(); //2
const simulationMode = setSimulation(); //3

function defaultFileOrder() {
  console.log("Organizando com base nas extensões predefinidas");
  readDir();
}

function readDir(str = "") {
  const inputExtensionsArr = str.split(" ") || null;

  //1.1.Lê o diretório fornecido
  fs.readdir(dirPath, "utf-8")
    .then((data) => getSourceFilesExtensions(data))
    .catch((err) => console.log(`Erro ao ler o diretório: ${err}`));
  return inputExtensionsArr;
}

//2.1.filtra a flag --extensions do process.argv (caso houver)
function defineInputExtensionsArr() {
  let inputExtensionsStr =
    args.filter((el) => el.includes("--extensions"))[0] ?? null;
  //2.2.retorna o array de extensões fornecidas
  if (inputExtensionsStr) {
    let firstBracket = inputExtensionsStr.indexOf("[");
    let lastBracket = inputExtensionsStr.lastIndexOf("]");
    inputExtensionsStr = inputExtensionsStr.slice(
      firstBracket + 1,
      lastBracket,
    );
    if (inputExtensionsStr) {
      console.log(
        `Organizando com base nas extensões inseridas: ${inputExtensionsStr}`,
      );
      return readDir(inputExtensionsStr);
    } else {
      //2.3.Significa que foi passada a flag --extensions, mas é vazia
      defaultFileOrder();
      return 0;
    }
  } else {
    //2.3.Significa que não foi passada a flag --extensions
    defaultFileOrder();
    return 0;
  }
}

//3.1Define o modo de simulação como true ou false
function setSimulation() {
  const flagArr = args.filter((el) => el.includes("--simulation"));
  return Boolean(flagArr[0]);
}

async function mvFiles(folder, extension, arr) {
  console.log(`diretório ${folder} criado com sucesso`);
  const filesArr = arr.filter((el) => Boolean(path.extname(el)) !== false); //retirar diretórios e deixar apenas os arquivos
  const file = filesArr.filter((el) => path.extname(el) === extension)[0];
  try {
    await fs.rename(path.join(dirPath, file), path.join(folder, file), 7);
  } catch (err) {
    console.error(err);
  }
}

function generateOtherFolder(extension, filesArr) {
  try {
    const folder = path.join(dirPath, "other");
    fs.mkdir(folder, { recursive: true })
      .then(() => mvFiles(folder, extension, filesArr))
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(`Erro ao criar diretório: ${err}`);
  }
}

function mapDir(value, filesArr) {
  for (let el_def of defaultExtensions) {
    console.log(
      `${value} em ${Object.values(el_def).flat()}: ${Object.values(el_def).flat().includes(`.${value}`)}`,
    );
    if (Object.values(el_def).flat().includes(`.${value}`)) {
      try {
        const folder = path.join(dirPath, Object.keys(el_def)[0]);
        fs.mkdir(folder, { recursive: true })
          .then(() => mvFiles(folder, `.${value}`, filesArr))
          .catch((err) => console.log(err));
        return;
      } catch (err) {
        console.error(`Erro ao criar diretório: ${err}`);
        return;
      }
    }
  }
  generateOtherFolder(`.${value}`, filesArr);
}

//1.2.grava as extensões dos arquivos do diretório lido
function getSourceFilesExtensions(data) {
  const sourceFilesArr = data.toString().split(",");
  let sourceExtensionsArr = [];

  sourceFilesArr.map((el) => {
    sourceExtensionsArr.push(path.extname(el));
  });
  sourceExtensionsArr = sourceExtensionsArr.filter((el) => el !== "");

  if (Boolean(inputExtensions)) {
    for (let el_input of inputExtensions) {
      if (sourceExtensionsArr.includes(`.${el_input}`)) {
        mapDir(el_input, sourceFilesArr);
        continue;
      }
      console.log(`Não Há Arquivos Com a Extensão .${el_input} em ${dirPath}`);
    }
    return;
  }
  sourceExtensionsArr.map((el) => {
    mapDir(el.slice(1, el.length), sourceFilesArr);
  });
}
