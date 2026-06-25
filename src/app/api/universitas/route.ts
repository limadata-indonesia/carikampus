import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page  = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 12)
  const q     = searchParams.get('q') || undefined
  const province = searchParams.get('province') || undefined

  const where = {
    status: 'APPROVED' as const,
    ...(province && { province }),
    ...(q && { OR: [
      { name: { contains: q, mode: 'insensitive' as const } },
      { city: { contains: q, mode: 'insensitive' as const } },
    ]}),
  }

  const [data, total] = await Promise.all([
    db.university.findMany({ where, take: limit, skip: (page-1)*limit, orderBy: { name: 'asc' }, include: { _count: { select: { reviews: true } } } }),
    db.university.count({ where }),
  ])

  return NextResponse.json({ data, total, page, limit })
}
