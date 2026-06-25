import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { PRICING } from '@/config'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { package: pkg } = await req.json()
  const pricing = PRICING[pkg as keyof typeof PRICING]
  if (!pricing) return NextResponse.json({ error: 'Invalid package' }, { status: 400 })

  const orderId = `CK-${Date.now()}-${session.user.id.slice(-6).toUpperCase()}`
  const purchase = await db.testPurchase.create({
    data: { userId: session.user.id, package: pkg, amount: pricing.amount, midtransOrderId: orderId }
  })
  return NextResponse.json({ data: { purchase, orderId } })
}
