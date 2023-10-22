const fs = require("fs");
const { extname, basename } = require("path");

const getDir = (path = __dirname) => {
  let dir = fs.readdirSync(path);

  return dir;
};
const supportedImageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
  ".ico",
  ".tiff",
];

const supportedVideoExtensions = [
  ".mp4",
  ".webm",
  ".ogv",
  ".mov",
  ".avi",
  ".flv",
  ".mkv",
  ".wmv",
];
const supportedSubtitleExtensions = [".vtt", ".srt", ".sub", ".sbv", ".ass"];
const readDir = (path = __dirname) => {
  const dirs = fs.opendirSync(path);
  let dirent = dirs.readSync();
  let directories = [];
  while (dirent) {
    const x = {
      name: dirent.name,
      path: dirent.path,
      parent: dirent.path.replace(dirent.name, ""),
      extension: extname(dirent.path),
      isHidden: dirent.name[0] === ".",
      isDirectory: dirent.isDirectory(),
      isFile: dirent.isFile(),
      isImage: supportedImageExtensions.includes(extname(dirent.path)),
      isVideo: supportedVideoExtensions.includes(extname(dirent.path)),
      isSubtitle: supportedSubtitleExtensions.includes(extname(dirent.path)),
    };
    directories.push(x);
    dirent = dirs.readSync();
  }
  const visibleDirectoris = directories.filter((obj) => !obj.isHidden);
  visibleDirectoris.sort((a, b) => {
    // First, sort by "isDirectory" in descending order (directories first)
    if (a.isDirectory === b.isDirectory) {
      // If "isDirectory" values are the same, sort by "name" in ascending order
      return a.name.localeCompare(b.name);
    } else {
      return a.isDirectory ? -1 : 1; // Directories come first
    }
  });
  dirs.closeSync();
  const dirName = basename(path);
  return [visibleDirectoris, dirName];
};
module.exports = { getDir, readDir };
