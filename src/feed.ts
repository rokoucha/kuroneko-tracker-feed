import { Feed } from 'feed'
import { getUrl } from './utils'
import { TAG_VERSION } from './constants'
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
    favicon:
      'https://raw.githubusercontent.com/rokoucha/kuroneko-tracker-feed/master/kuroneko.ico',
    copyright: 'All rights reserved by Yamato Transport',
    updated: status.details.slice(-1)[0].date,
    generator: `kuroneko-tracker-feed/${env.VERSION}`,
    feedLinks: {
      atom: getUrl(env.BASE_URL, `/feed/${number01}/atom`),
      json: getUrl(env.BASE_URL, `/feed/${number01}/json`),
    },
    author,
  })

  const fqdn = new URL(env.BASE_URL).hostname

  const { state, summary, note, product, schedule } = status

  for (const [i, d] of status.details.entries()) {
    const { item, date, name } = d

    const dateText = `${
      date.getMonth() + 1
    }月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`

    feed.addItem({
      title: `${item} ${dateText} ${name}`,
      id: `tag:${fqdn},${TAG_VERSION}:entry://${number01}-${i}`,
      link: env.KURONEKO_URL,
      description: `${state} - ${summary} ${note}\n商品名: ${product}, お届け予定日時: ${schedule}`,
      author: [author],
      date: date,
    })
  }

  return type === 'atom' ? feed.atom1() : feed.json1()
}
