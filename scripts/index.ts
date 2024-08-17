import process from 'node:process'
import c from 'picocolors'
import { CONFIG, writeJSONToOutput } from './utils'
import { createGitHubApi, createNPMApi } from './api'

export const npmScript = async () => {
  const api = createNPMApi(CONFIG.NPM_UID)
  const [packages] = await Promise.all([api.getPackages()])
  console.log(`\nNPM data: packages: ${c.yellow(packages.length)}`)
  const now = new Date()
  await writeJSONToOutput('npm.json', {
    '//': now.toString(),
    packages,
  })
}
export const githubScript = async () => {
  const api = createGitHubApi(CONFIG.GITHUB_UID)
  const [repos, userInfo] = await Promise.all([api.getUserRepos(), api.getUser()])
  console.log(`\nGitHub data: repos: ${c.yellow(repos.length)}`)
  const now = new Date()
  await writeJSONToOutput('github.json', {
    '//': now.toString(),
    userInfo,
    repos,
  })
}

async function main() {
  const now = new Date()
  console.log(`\nGenerator started at ${c.cyan(now.toString())}`)

  await npmScript()
  await githubScript()

  console.log(c.green('\nGenerated successfully!'))
}

await main().catch(err => {
  console.log(c.red('Ops, something is wrong!'), err)
  process.exit(1)
})
