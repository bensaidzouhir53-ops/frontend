import {
  forwardAdminRequest,
  getAdminBackendPath,
  getAuthorizationHeader,
} from '@/lib/admin.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ path: string[] }> }

async function proxy(request: Request, context: RouteContext): Promise<Response> {
  const { path } = await context.params
  const auth = getAuthorizationHeader(request)

  if (!auth) {
    return Response.json(
      { detail: { message: 'Missing admin authorization' } },
      { status: 401 },
    )
  }

  const backendPath = getAdminBackendPath(request, path)
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  const body = hasBody ? await request.text() : undefined
  const contentType =
    request.headers.get('content-type') || (body ? 'application/json' : null)

  return forwardAdminRequest(backendPath, {
    method: request.method,
    authorization: auth,
    contentType,
    body,
  })
}

export async function GET(request: Request, context: RouteContext) {
  return proxy(request, context)
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxy(request, context)
}

export async function POST(request: Request, context: RouteContext) {
  return proxy(request, context)
}
