import * as cheerio from 'cheerio'
import { DATE_MATCHER } from './constants'
import type { Env, Status } from './types'

export async function getStatus(number01: number, env: Env): Promise<Status> {
  const params = new URLSearchParams()
  params.set('mypagesession', '')
  params.set('backaddress', '')
  params.set('backrequest', 'get')
  params.set('category', '0')
  params.set('number01', String(number01))
  params.set('number02', '')
  params.set('number03', '')
  params.set('number04', '')
  params.set('number05', '')
  params.set('number06', '')
  params.set('number07', '')
  params.set('number08', '')
  params.set('number09', '')
  params.set('number10', '')

  const res = await fetch(env.KURONEKO_URL, {
    headers: {
      'Accept-Language': 'ja',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 kuroneko-tracker-feed/${env.VERSION}`,
      Referer: 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko',
    },
    body: params.toString(),
    method: 'POST',
  })

  const $ = cheerio.load(await res.text())

  const state = $('.tracking-invoice-block-state-title').text()
  const summary = $('.tracking-invoice-block-state-summary').text()
  const note = $('.tracking-invoice-block-state-note').text()
  const product = $(
    '.tracking-invoice-block-summary > ul > li:nth-child(1) > .data',
  ).text()
  const schedule = $(
    '.tracking-invoice-block-summary > ul > li:nth-child(2) > .data',
  ).text()

  const now = new Date()

  const details = $('.tracking-invoice-block-detail > ol > li')
    .map((_, e) => {
      const dateText = $(e).children('.date').text()

      const [__, month, day, hour, minute] = [
        ...dateText.matchAll(DATE_MATCHER),
      ][0]

      const date = new Date(
        `${now.getFullYear()}-${month}-${day}T${hour}:${minute}:00+0900`,
      )

      if (date > now) {
        date.setFullYear(date.getFullYear() - 1)
      }

      return {
        item: $(e).children('.item').text(),
        date,
        name: $(e).children('.name').text(),
      }
    })
    .toArray()

  if (details.length === 0) {
    throw new Error(
      JSON.stringify({
        state,
        summary,
        note,
      }),
    )
  }

  return {
    state,
    summary,
    note,
    product,
    schedule,
    details,
  }
}
