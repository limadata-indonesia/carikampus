import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { order_id, transaction_status, fraud_status } = body

  const purchase = await db?.testPurchase?.findFirst({ where: { midtransOrderId: order_id } })
  if (!purchase) return NextResponse.json({ ok: false }, { status: 404 })

  let status: 'PAID' | 'FAILED' | 'EXPIRED' = 'PAID'
  if (transaction_status === 'capture' && fraud_status === 'accept') status = 'PAID'
  else if (transaction_status === 'settlement') status = 'PAID'
  else if (['cancel', 'deny', 'failure'].includes(transaction_status)) status = 'FAILED'
  else if (transaction_status === 'expire') status = 'EXPIRED'
  else return NextResponse.json({ ok: true })

  await db?.testPurchase?.update({
    where: { id: purchase.id },
    data: { status, paidAt: status === 'PAID' ? new Date() : undefined }
  })

  // Grant access if paid
  if (status === 'PAID') {
    await db?.testAccessGrant?.create({
      data: {
        userId: purchase.userId,
        source: 'PURCHASE',
        purchaseId: purchase.id,
        active: true,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      }
    })
  }

  return NextResponse.json({ ok: true })
}
