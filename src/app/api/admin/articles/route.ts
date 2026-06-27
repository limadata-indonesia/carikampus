import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const articles = await db.article.findMany({
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, category: true, published: true, publishedAt: true, emoji: true, readTime: true, excerpt: true },
    })
    return NextResponse.json(articles)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, excerpt, content, category, emoji, readTime, published } = body
    if (!title || !slug || !content || !category) {
      return NextResponse.json({ error: 'title, slug, content, category required' }, { status: 400 })
    }
    const article = await db.article.create({
      data: {
        title, slug, excerpt, content, category,
        emoji: emoji || '📝',
        readTime: readTime || '5 menit',
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
