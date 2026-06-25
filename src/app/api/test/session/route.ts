import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const grant = await db.testAccessGrant.findFirst({
    where: { userId: session.user.id, active: true, OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }] }
  })
  if (!grant) return NextResponse.json({ error: 'No active test access' }, { status: 403 })

  const existing = await db.testSession.findFirst({ where: { userId: session.user.id, status: 'IN_PROGRESS' } })
  if (existing) return NextResponse.json({ data: existing })

  const testSession = await db.testSession.create({ data: { userId: session.user.id } })
  return NextResponse.json({ data: testSession })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { sessionId, section, answers } = await req.json()
  const updated = await db.testSession.update({
    where: { id: sessionId, userId: session.user.id },
    data: { section, answers, lastActiveAt: new Date() }
  })
  return NextResponse.json({ data: updated })
}
