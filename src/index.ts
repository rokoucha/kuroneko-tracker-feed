import { Router } from 'itty-router'
import { z } from 'zod'
import { CONTENT_TYPE } from './constants'
import { generateFeed } from './feed'
import { getStatus } from './status'
import { renderHelp } from './help'
import type { Env, Status } from './types'

const router = Router()

router.get('/', (_, env: Env) => {
  return new Response(renderHelp(env), {
    headers: { 'Content-Type': CONTENT_TYPE.html },
  })
})

router.get('/feed/:number01/:type?', async (req, env: Env) => {
  const { number01, type } = z
    .object({
      number01: z
        .string()
        .refine((v) => !isNaN(parseInt(v, 10)))
        .transform((v) => parseInt(v, 10)),
      type: z.optional(z.enum(['atom', 'json'])).transform((v) => v ?? 'json'),
    })
    .parse(req.params)

  let status: Status
  try {
    status = await getStatus(number01, env)
  } catch (e) {
    return new Response(
      e instanceof Error
        ? e.message
        : JSON.stringify({ message: 'Not Found', code: -1 }),
      {
        status: 404,
        headers: { 'Content-Type': CONTENT_TYPE.appjson },
      },
    )
  }

  return new Response(generateFeed(number01, status, type, env), {
    headers: { 'Content-Type': CONTENT_TYPE[type] },
  })
})

router.all('*', () => new Response('Not Found', { status: 404 }))

const worker: ExportedHandler = {
  fetch: router.handle,
}

export default worker
