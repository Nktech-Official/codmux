import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getDir, readDir } from './module/ReadDirectory'
import { readHtml } from './module/ReadFiles'
// Custom APIs for renderer
const dir = {
  getDir: getDir,
  readDir: readDir
}

const choose = {
  openDir: () => ipcRenderer.invoke('dialog:openDirectory')
}

const file = {
  readHtml: readHtml
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('dir', dir)
    contextBridge.exposeInMainWorld('choose', choose)
    contextBridge.exposeInMainWorld('file', file)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.dir = dir
  window.choose = choose
  window.file = file
}
