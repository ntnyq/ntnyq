import process from 'node:process'
import { consola } from 'consola'
import c from 'picocolors'
import { createGitHubApi, createNPMApi } from './api'
import { CONFIG, writeJSONToOutput } from './utils'

export const npmScript = async () => {
  const api = createNPMApi(CONFIG.NPM_UID)
  const [packages] = await Promise.all([api.getPackages()])

  consola.info(`NPM data: packages: ${c.yellow(packages.length)}`)

  const now = new Date()
  await writeJSONToOutput('npm.json', {
    '//': now.toString(),
    packages,
  })
}
export const githubScript = async () => {
  const api = createGitHubApi(CONFIG.GITHUB_UID)
  const [repos, userInfo] = await Promise.all([api.getUserRepos(), api.getUser()])

  consola.info(`GitHub data: repos: ${c.yellow(repos.length)}`)

  const now = new Date()
  await writeJSONToOutput('github.json', {
    '//': now.toString(),
    userInfo,
    repos,
  })
}

async function main() {
  const now = new Date()

  consola.info(`Generator started at ${c.cyan(now.toLocaleString())}`)

  await npmScript()
  await githubScript()

  consola.success('Generated successfully!')
}

await main().catch(err => {
  consola.error(c.red('Ops, something is wrong!'), err)
  process.exit(1)
})
