import c from 'picocolors'
import { CONFIG, writeJSONToOutput } from './utils'
import {
  fetchNPMPackages,
  fetchGitHubRepos,
  fetchGitHubUserInfo,
} from './fetchers'

export const npmScript = async () => {
  const [packages] = await Promise.all([fetchNPMPackages(CONFIG.NPM_UID)])
  console.log(`NPM data: packages: ${c.yellow(packages.length)}`)
  const now = new Date()
  await writeJSONToOutput(`npm.json`, {
    '//': now.toString(),
    packages,
  })
}
export const githubScript = async () => {
  const [repos, userInfo] = await Promise.all([
    fetchGitHubRepos(CONFIG.GITHUB_UID),
    fetchGitHubUserInfo(CONFIG.GITHUB_UID),
  ])
  console.log(`GitHub data: repos: ${c.yellow(repos.length)}`)
  const now = new Date()
  await writeJSONToOutput(`github.json`, {
    '//': now.toString(),
    userInfo,
    repos,
  })
}

async function main() {
  const now = new Date()
  console.log(`Generator started at ${c.cyan(now.toString())}`)

  await npmScript()
  await githubScript()

  console.log()
  console.log(c.green(`Generated successfully!`))
  console.log()
}

try {
  main()
} catch (err) {
  console.log(c.red(`Ops, something is wrong!`), err)
  process.exit(1)
}
