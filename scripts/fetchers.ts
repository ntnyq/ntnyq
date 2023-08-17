import { $fetch } from 'ofetch'

export async function fetchNPMPackages(npmUID: string) {
  const res = await $fetch(`https://registry.npmjs.com/-/v1/search?text=maintainer:${npmUID}`)
  return res?.objects ?? []
}

export async function fetchGitHubUserInfo(githubUID: string) {
  return await $fetch(`https://api.github.com/users/${githubUID}`)
}

export async function fetchGitHubRepos(githubUID: string) {
  return await $fetch(`https://api.github.com/users/${githubUID}/repos?per_page=1000`)
}
