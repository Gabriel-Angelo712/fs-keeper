const DEFAULT_EXTENSIONS = {
  images: {
    label: "Images",
    extensions: [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
      ".ico",
    ],
  },
  documents: {
    label: "Documents",
    extensions: [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".txt",
      ".rtf",
      ".odt",
      ".ods",
      ".odp",
    ],
  },
  code: {
    label: "Code",
    extensions: [
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".py",
      ".java",
      ".c",
      ".cpp",
      ".cs",
      ".rb",
      ".go",
      ".rs",
      ".php",
      ".html",
      ".css",
      ".scss",
      ".json",
      ".xml",
      ".yaml",
      ".yml",
      ".toml",
    ],
  },
  videos: {
    label: "Videos",
    extensions: [
      ".mp4",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
      ".webm",
      ".m4v",
    ],
  },
  audio: {
    label: "Audio",
    extensions: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".wma", ".m4a"],
  },
  compressed: {
    label: "Compressed",
    extensions: [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".xz", ".iso"],
  },
  executables: {
    label: " Executables",
    extensions: [
      ".exe",
      ".msi",
      ".apk",
      ".dmg",
      ".deb",
      ".rpm",
      ".sh",
      ".bat",
      ".cmd",
    ],
  },
  data: {
    label: "Data",
    extensions: [".csv", ".tsv", ".sql", ".db", ".sqlite", ".mdb", ".parquet"],
  },
  fonts: {
    label: "Fonts",
    extensions: [".ttf", ".otf", ".woff", ".woff2", ".eot"],
  },
  design: {
    label: "Design",
    extensions: [".ai", ".eps", ".psd", ".xd", ".sketch", ".fig"],
  },
};

export function* demandDefaultExtensions() {
  for (let obj of Object.values(DEFAULT_EXTENSIONS)) {
    yield obj;    
  }
}

export default DEFAULT_EXTENSIONS;
