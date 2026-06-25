import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { action } = await req.json()
  const status = action === 'approve' ? 'APPROVED' : 'REJECTED'
  const updated = await db?.university?.update({ where: { id }, data: { status, approvedAt: action === 'approve' ? new Date() : null } })
  return NextResponse.json({ data: updated })
}
