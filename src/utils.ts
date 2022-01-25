export function getUrl(baseUrl: string, path: string): string {
  const url = new URL(baseUrl)

  url.pathname = path

  return url.href
}

export function getKuronekoUrl(
  number01: number,
  {
    KURONEKO_KEY,
    KURONEKO_NUMBER00,
    KURONEKO_URL,
  }: {
    KURONEKO_KEY: string
    KURONEKO_NUMBER00: string
    KURONEKO_URL: string
  },
) {
  const url = new URL(KURONEKO_URL)

  const params = new URLSearchParams()
  params.set('number00', String(KURONEKO_NUMBER00))
  params.set('number01', String(number01))
  params.set('key', KURONEKO_KEY)

  url.search = params.toString()

  return url.href
}
