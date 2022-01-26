export function getUrl(baseUrl: string, path: string): string {
  const url = new URL(baseUrl)

  url.pathname = path

  return url.href
}
