export const CONTENT_TYPE = {
  atom: 'application/atom+xml',
  appjson: 'application/json',
  html: 'text/html; charset=UTF-8',
  json: 'application/feed+json',
} as const

export const DATE_MATCHER = /(\d{2})月(\d{2})日(?:\s+(\d{2}):(\d{2}))?/g

export const TAG_VERSION = '2022-01-26'
