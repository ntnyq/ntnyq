import path from 'path'
import fs from 'fs-extra'
import { config } from '../package.json'

export const CONFIG = config

export const resolve = (...args: string[]) => path.resolve(__dirname, `..`, ...args)

export function jsonStringify (data: any) {
  return JSON.stringify(data, null, 2)
}

export async function writeFileToOutput (filename: string, fileContent: string) {
  await fs.ensureDir(resolve(`output`))
  await fs.writeFile(resolve(`output`, filename), fileContent)
}

export async function writeJSONToOutput (filename: string, data: any) {
  await writeFileToOutput(filename, jsonStringify(data))
}
