import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const uni = await db?.university?.findUnique({ where: { id }, include: { faculties: { include: { programs: true } }, facilities: true, dormitories: true, reviews: true } })
  if (!uni) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: uni })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const updated = await db?.university?.update({ where: { id }, data: body })
  return NextResponse.json({ data: updated })
}
