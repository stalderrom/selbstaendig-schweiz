import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'
import { NextResponse } from 'next/server'

function notFound() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

const handlers =
  process.env.NODE_ENV === 'production'
    ? { GET: notFound, POST: notFound }
    : makeRouteHandler({ config })

export const { GET, POST } = handlers
