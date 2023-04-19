import process from 'node:process'
import fs from 'fs-extra'
import c from 'picocolors'
import { resolve } from './utils.mjs'

const iconList = [
  // Brand
  'github',
  'twitter',
  'gmail',

  // Skill
  'html5',
  'css3',
  'sass',
  'javascript',
  'typescript',
  'vue',
  'flutter',
  'yarn',
  'json',
  'git',
  'npm',
  'markdown',
]

const copyIcon = async (name: string) =>
  fs.copyFile(
    resolve(`node_modules/super-tiny-icons/images/svg/${name}.svg`),
    resolve(`icons/${name}.svg`),
  )

const main = async () => {
  await fs.emptyDir(resolve('icons'))
  await Promise.all(iconList.map(icon => copyIcon(icon)))
}

try {
  main()
} catch (err) {
  console.log(c.red('Ops, something is wrong!'), err)
  process.exit(1)
}
