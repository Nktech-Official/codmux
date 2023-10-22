const { contextBridge, ipcRenderer } = require("electron");
const { getDir, readDir } = require("./module/ReadDirectory");
const { readHtml } = require("./module/ReadFiles");
const os = require("os");

contextBridge.exposeInMainWorld("electron", {
  homeDir: () => os.homedir(),
  osVersion: () => os.version(),
});

contextBridge.exposeInMainWorld("dir", {
  getDir: getDir,
  readDir: readDir,
});

contextBridge.exposeInMainWorld("choose", {
  openDir: () => ipcRenderer.invoke("dialog:openDirectory"),
});

contextBridge.exposeInMainWorld("file", {
  readHtml: readHtml,
});
