import { readdirSync, opendirSync } from 'fs-extra'
import { extname, basename, join } from 'node:path'

export const getDir = (path = __dirname) => {
  let dir = readdirSync(path)

  return dir
}

const supportedImageExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.webp',
  '.svg',
  '.ico',
  '.tiff'
]

const supportedVideoExtensions = ['.mp4', '.webm', '.ogv', '.mov', '.avi', '.flv', '.mkv', '.wmv']
const supportedSubtitleExtensions = ['.vtt', '.srt', '.sub', '.sbv', '.ass']

export const readDir = (path = __dirname) => {
  let directories = []
  let prev = null
  const dirs = opendirSync(path)
  let dirent = dirs.readSync()
  console.log(dirent)
  console.log(dirent.name)
  while (dirent) {
    console.log(dirent.name)
    const p = join(path, dirent.name)
    const x = {
      name: dirent.name,
      path: p,
      parent: path,
      extension: extname(p),
      isHidden: dirent.name[0] === '.',
      isDirectory: dirent.isDirectory(),
      isFile: dirent.isFile(),
      isImage: supportedImageExtensions.includes(extname(p)),
      isVideo: supportedVideoExtensions.includes(extname(p)),
      isSubtitle: supportedSubtitleExtensions.includes(extname(p)),
      next: null,
      prev: prev
    }
    prev = p
    dirent = dirs.readSync()
    x.next = dirent ? p : null
    directories.push(x)
  }
  const visibleDirectoris = directories.filter((obj) => !obj.isHidden)
  visibleDirectoris.sort((a, b) => {
    // First, sort by "isDirectory" in descending order (directories first)
    if (a.isDirectory === b.isDirectory) {
      // If "isDirectory" values are the same, sort by "name" in ascending order
      return a.name.localeCompare(b.name)
    } else {
      return a.isDirectory ? -1 : 1 // Directories come first
    }
  })
  dirs.closeSync()
  const dirName = basename(path)
  return [visibleDirectoris, dirName]
}
