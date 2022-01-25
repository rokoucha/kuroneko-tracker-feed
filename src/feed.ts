import { Feed } from 'feed'
import { getKuronekoUrl, getUrl } from './utils'
import type { Env, Status } from './types'

export function generateFeed(
  number01: number,
  status: Status,
  type: 'atom' | 'json',
  env: Env,
): string {
  const author = {
    name: 'kuroneko-tracker-feed',
    link: env.BASE_URL,
  }

  const feed = new Feed({
    title: `${number01} - Kuroneko Tracker Feed`,
    description: 'Kuroneko Yamato Tracker Feed Generator',
    id: getUrl(env.BASE_URL, `/feed/${number01}/${type}`),
    link: env.BASE_URL,
    favicon: 'http://example.com/favicon.ico',
    copyright: 'All rights reserved by Yamato Transport',
    updated: status.slice(-1)[0].date,
    generator: `kuroneko-tracker-feed/${env.VERSION}`,
    feedLinks: {
      atom: getUrl(env.BASE_URL, `/feed/${number01}/atom`),
      json: getUrl(env.BASE_URL, `/feed/${number01}/json`),
    },
    author,
  })

  const fqdn = new URL(env.BASE_URL).hostname

  for (const [i, s] of status.entries()) {
    const { state, date, name, code } = s

    feed.addItem({
      title: `${state} at ${name}(${code})`,
      id: `tag:${fqdn},2021:entry://${number01}-${i}`,
      link: getKuronekoUrl(number01, env),
      description: `${state} at ${name}(${code}) in ${date.toISOString()}`,
      author: [author],
      date: s.date,
    })
  }

  return type === 'atom' ? feed.atom1() : feed.json1()
}
