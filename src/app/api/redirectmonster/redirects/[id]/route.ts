import { NextResponse } from 'next/server'
import {
  forwardRedirectMonsterRequest,
  getAuthorizationHeader,
} from '@/lib/redirectmonster.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

function unauthorized() {
  return NextResponse.json({ detail: { message: 'Missing authorization' } }, { status: 401 })
}

export async function PATCH(request: Request, context: RouteContext) {
  const authorization = getAuthorizationHeader(request)
  if (!authorization) return unauthorized()

  const { id } = await context.params
  const payload = await request.json().catch(() => null)
  if (!payload) {
    return NextResponse.json({ detail: { message: 'Invalid request body' } }, { status: 400 })
  }

  const result = await forwardRedirectMonsterRequest(`/api/redirectmonster/redirects/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (result.ok) {
    return NextResponse.json(result.body, { status: result.status })
  }

  return NextResponse.json(result.body, { status: result.status })
}

export async function DELETE(request: Request, context: RouteContext) {
  const authorization = getAuthorizationHeader(request)
  if (!authorization) return unauthorized()

  const { id } = await context.params

  const result = await forwardRedirectMonsterRequest(`/api/redirectmonster/redirects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: authorization },
  })

  if (result.ok) {
    return new NextResponse(null, { status: result.status })
  }

  return NextResponse.json(result.body, { status: result.status })
}
