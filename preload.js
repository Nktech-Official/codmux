const { contextBridge, ipcRenderer } = require("electron");
const { getDir, readDir } = require("./module/ReadDirectory");

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
