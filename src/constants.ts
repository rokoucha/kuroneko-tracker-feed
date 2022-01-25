export const CONTENT_TYPE = {
  atom: 'application/atom+xml',
  appjson: 'application/json',
  html: 'text/html; charset=UTF-8',
  json: 'application/feed+json',
} as const

export const ERROR_MATCHER =
  /<tr><td><font size="5">([^<]+)<\/font><\/td><\/tr>\n<tr><td><br><\/td><\/tr>\n<tr><td><font size="4"><center>Error Code = ([^<]+)<\/center><\/font><\/td><\/tr>/g

export const STATUS_MATCHER =
  /<tr>\n<td>(.+)<br><\/td>\n<td>(\d+)\/(\d+)<br><\/td>\n<td>(\d+):(\d+)<br><\/td>\n<td>(?:<a [^>]+>([^<]+)<\/a>|([^<]+))<br><\/td>\n<td>(.+)<br><\/td>/g
