import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || 'binus-university'

  const results: Record<string, unknown> = {}

  // 1. Basic list
  try {
    const unis = await db.university.findMany({
      where: { status: 'APPROVED' },
      select: { id: true, name: true, slug: true, status: true },
    })
    results.list = { count: unis.length, universities: unis }
  } catch (e) {
    results.list = { error: String(e) }
  }

  // 2. Simple findFirst (no includes)
  try {
    const uni = await db.university.findFirst({ where: { slug } })
    results.findFirst = { found: !!uni, name: uni?.name, status: uni?.status }
  } catch (e) {
    results.findFirst = { error: String(e) }
  }

  // 3. With faculties + reviews (like homepage)
  try {
    const uni = await db.university.findFirst({
      where: { slug },
      include: {
        faculties: { include: { programs: true } },
        reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
        _count: { select: { reviews: true } },
      },
    })
    results.withFacultiesReviews = { found: !!uni }
  } catch (e) {
    results.withFacultiesReviews = { error: String(e) }
  }

  // 4. With facilities
  try {
    const uni = await db.university.findFirst({ where: { slug }, include: { facilities: true } })
    results.withFacilities = { found: !!uni }
  } catch (e) {
    results.withFacilities = { error: String(e) }
  }

  // 5. With dormitories
  try {
    const uni = await db.university.findFirst({ where: { slug }, include: { dormitories: true } })
    results.withDormitories = { found: !!uni }
  } catch (e) {
    results.withDormitories = { error: String(e) }
  }

  // 6. _count with applications + savedBy
  try {
    const uni = await db.university.findFirst({
      where: { slug },
      include: { _count: { select: { reviews: true, applications: true, savedBy: true } } },
    })
    results.withCountAll = { found: !!uni, count: (uni as any)?._count }
  } catch (e) {
    results.withCountAll = { error: String(e) }
  }

  // 7. Full query (what profile page does)
  try {
    const uni = await db.university.findFirst({
      where: { slug, status: 'APPROVED' },
      include: {
        faculties: { include: { programs: true } },
        facilities: true,
        dormitories: true,
        reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
        _count: { select: { reviews: true, applications: true, savedBy: true } },
      },
    })
    results.fullQuery = { found: !!uni }
  } catch (e) {
    results.fullQuery = { error: String(e) }
  }

  return NextResponse.json(results, { status: 200 })
}
