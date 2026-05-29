import { NextResponse } from 'next/server'
import {
  forwardRedirectMonsterRequest,
  getAuthorizationHeader,
} from '@/lib/redirectmonster.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function unauthorized() {
  return NextResponse.json({ detail: { message: 'Missing authorization' } }, { status: 401 })
}

export async function GET(request: Request) {
  const authorization = getAuthorizationHeader(request)
  if (!authorization) return unauthorized()

  const result = await forwardRedirectMonsterRequest('/api/redirectmonster/redirects', {
    method: 'GET',
    headers: { Authorization: authorization },
  })

  if (result.ok) {
    return NextResponse.json(result.body, { status: result.status })
  }

  return NextResponse.json(result.body, { status: result.status })
}

export async function POST(request: Request) {
  const authorization = getAuthorizationHeader(request)
  if (!authorization) return unauthorized()

  const payload = await request.json().catch(() => null)
  if (!payload) {
    return NextResponse.json({ detail: { message: 'Invalid request body' } }, { status: 400 })
  }

  const result = await forwardRedirectMonsterRequest('/api/redirectmonster/redirects', {
    method: 'POST',
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
