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
  while (dirent) {
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
  dirs.closeSync()
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
  const subTitles = visibleDirectoris.filter((obj) => obj.isSubtitle)

  visibleDirectoris.forEach((obj) => {
    if (obj.isVideo) {
      // Check if there is a corresponding subtitle file
      const videoFilename = obj.name
      const videoBaseName = basename(videoFilename, extname(videoFilename))
      const matchingSubtitle = subTitles.find((subtitleObj) => {
        const subtitleBaseName = basename(subtitleObj.name, extname(subtitleObj.name))
        return subtitleBaseName === videoBaseName
      })

      if (matchingSubtitle) {
        // Create a link between the video and its corresponding subtitle

        // Update the video object to include the Subtitle field
        obj.Subtitle = matchingSubtitle.path
      }
    }
  })

  const dirName = basename(path)
  return [visibleDirectoris, dirName]
}
