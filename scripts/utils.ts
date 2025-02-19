import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { config } from '../package.json'

export const CONFIG: { NPM_UID: string; GITHUB_UID: string } = config

const OUTPUT_DIR = 'output'

export function resolve(...args: string[]): string {
  return path.resolve(import.meta.dirname, '..', ...args)
}

export function jsonStringify(data: any): string {
  return JSON.stringify(data, null, 2)
}

export async function writeFileToOutput(
  filename: string,
  fileContent: string,
): Promise<void> {
  await ensureDir(resolve(OUTPUT_DIR))
  await writeFile(resolve(OUTPUT_DIR, filename), fileContent)
}

export async function writeJSONToOutput(
  filename: string,
  data: Record<string, any>,
): Promise<void> {
  await writeFileToOutput(filename, jsonStringify(data))
}

export async function exists(path: string): Promise<boolean> {
  return access(path)
    .then(() => true)
    .catch(() => false)
}

export async function ensureDir(path: string): Promise<void> {
  if (await exists(path)) {
    return
  }
  await mkdir(path, { recursive: true })
}
