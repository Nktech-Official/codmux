import { readFileSync } from 'node:fs'

export const readHtml = (path) => {
  const data = readFileSync(path, { encoding: 'utf8' })
  return data
}
