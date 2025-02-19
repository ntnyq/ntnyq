/**
 * @file API
 */

import { ofetch } from 'ofetch'
import type { IPackage, IRepo, IUser } from './types'

export function createGitHubApi(uid: string) {
  const fetch = ofetch.create({
    baseURL: 'https://api.github.com',
  })

  return {
    async getUser(): Promise<IUser> {
      return await fetch<IUser>(`/users/${uid}`)
    },

    async getUserRepos(): Promise<IRepo[]> {
      return await fetch<IRepo[]>(`/users/${uid}/repos`, {
        params: {
          per_page: 1000,
        },
      })
    },
  }
}

export function createNPMApi(uid: string) {
  const fetch = ofetch.create({
    baseURL: 'https://registry.npmjs.com/-/v1',
  })

  return {
    async getPackages(): Promise<IPackage[]> {
      const res = await fetch<{ objects?: IPackage[] }>(`/search`, {
        params: {
          text: `maintainer:${uid}`,
        },
      })
      return res.objects ?? []
    },
  }
}
