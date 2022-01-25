import { Router } from 'itty-router'

const router = Router()

router.get('/', () => new Response('hello'))

const worker: ExportedHandler = {
  fetch: router.handle,
}

export default worker
