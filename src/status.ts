import { encodingIndexes } from '@zxing/text-encoding/esm/encoding-indexes'

declare const self: ServiceWorkerGlobalScope & {
  TextEncodingIndexes: { encodingIndexes: typeof encodingIndexes }
}
self['TextEncodingIndexes'] = { encodingIndexes }

import { TextDecoder } from '@zxing/text-encoding'
import { ERROR_MATCHER, STATUS_MATCHER } from './constants'
import { getKuronekoUrl } from './utils'
import type { Env, Status } from './types'

export async function getStatus(number01: number, env: Env): Promise<Status> {
  const endpoint = getKuronekoUrl(number01, env)

  const res = await fetch(endpoint)

  const decoder = new TextDecoder('Shift_JIS')
  const text = decoder.decode(await res.arrayBuffer())

  const error = [...text.matchAll(ERROR_MATCHER)]
  if (error.length > 0) {
    throw new Error(JSON.stringify({ message: error[0][1], code: error[0][2] }))
  }

  const now = new Date()

  const statuses = [...text.matchAll(STATUS_MATCHER)].map(
    ([_, state, month, day, hour, minute, name1, name2, code]) => {
      const date = new Date(
        `${now.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(
          2,
          '0',
        )}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00+0900`,
      )

      if (date > now) {
        date.setFullYear(date.getFullYear() - 1)
      }

      return { state, date, name: name1 ?? name2, code }
    },
  )

  return statuses
}
