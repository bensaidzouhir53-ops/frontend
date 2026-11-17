export const dynamic = 'force-static'

/** Proxy health check. Must not call the API. */
export function GET() {
  return new Response('ok', {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
