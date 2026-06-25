export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const bucket = formData.get('bucket') as string || 'uploads'

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const path = `${session.user.id}/${Date.now()}.${ext}`
  const bytes = await file.arrayBuffer()

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, bytes, { contentType: file.type, upsert: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({ data: { path: data.path, url: publicUrl } })
}
