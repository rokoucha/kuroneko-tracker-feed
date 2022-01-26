export type Env = {
  BASE_URL: string
  KURONEKO_URL: string
  VERSION: string
}

export type Status = {
  state: string
  summary: string
  note: string
  product: string
  schedule: string
  details: {
    item: string
    date: Date
    name: string
  }[]
}
