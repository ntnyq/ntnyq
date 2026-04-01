import process from 'node:process'
import { consola } from 'consola'
import c from 'picocolors'
import { createGitHubApi, createNPMApi } from './api'
import { GITHUB_USER_ID, NPM_USER_ID } from './constants'
import { writeJSONToOutput } from './utils'

export async function npmScript(): Promise<void> {
  const api = createNPMApi(NPM_USER_ID)
  const [packages] = await Promise.all([api.getPackages()])

  consola.info(`NPM data: packages: ${c.yellow(packages.length)}`)

  const now = new Date()
  await writeJSONToOutput('npm.json', {
    '//': now.toString(),
    packages,
  })
}

export async function githubScript(): Promise<void> {
  const api = createGitHubApi(GITHUB_USER_ID)
  const [repos, userInfo] = await Promise.all([
    api.getUserRepos(),
    api.getUser(),
  ])

  consola.info(`GitHub data: repos: ${c.yellow(repos.length)}`)

  const now = new Date()
  await writeJSONToOutput('github.json', {
    '//': now.toString(),
    repos,
    userInfo,
  })
}

async function main() {
  const now = new Date()

  consola.info(`Generator started at ${c.cyan(now.toLocaleString())}`)

  await npmScript()
  await githubScript()

  consola.success('Generated successfully!')
}

await main().catch(error => {
  consola.error(c.red('Ops, something is wrong!'), error)
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1)
})
