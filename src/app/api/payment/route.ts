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

  const orderId = `CK-${Date.now()}-${(session.user as any).id.slice(-6).toUpperCase()}`

  const purchase = await db.testPurchase.create({
    data: { userId: (session.user as any).id, package: pkg, amount: pricing.amount, midtransOrderId: orderId },
  })

  // Call Midtrans Snap API to get payment token
  const midtransToken = await getMidtransToken({
    orderId,
    amount: pricing.amount,
    user: session.user,
    label: pricing.label,
  })

  if (midtransToken) {
    await db.testPurchase.update({ where: { id: purchase.id }, data: { midtransToken } })
  }

  return NextResponse.json({ data: { purchase, orderId, snapToken: midtransToken } })
}

async function getMidtransToken({
  orderId, amount, user, label,
}: { orderId: string; amount: number; user: any; label: string }) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY
  if (!serverKey) return null

  const isProduction = process.env.MIDTRANS_ENV === 'production'
  const baseUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(serverKey + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        transaction_details: { order_id: orderId, gross_amount: amount },
        item_details: [{ id: orderId, price: amount, quantity: 1, name: `Tes Minat - ${label}` }],
        customer_details: { first_name: user.name || 'Pengguna', email: user.email },
        callbacks: {
          finish: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/siswa/tes?status=success`,
          error:  `${process.env.NEXT_PUBLIC_APP_URL}/tes-minat?status=error`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/siswa/tes?status=pending`,
        },
      }),
    })
    const data = await res.json()
    return data.token ?? null
  } catch {
    return null
  }
}
