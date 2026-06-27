'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['Tips Karier', 'Universitas', 'Tes Minat', 'SNBT', 'Biaya Kuliah', 'Karier']
const EMOJIS = ['🎯', '🏆', '🧠', '📚', '💰', '🚀', '📝', '🏛', '🎓', '💡', '📊', '🔍']

interface Article {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  emoji: string
  readTime: string
  published: boolean
}

export default function ArticleEditor({ initial }: { initial?: Article }) {
  const router = useRouter()
  const [form, setForm] = useState<Article>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    category: initial?.category ?? 'Tips Karier',
    emoji: initial?.emoji ?? '📝',
    readTime: initial?.readTime ?? '5 menit',
    published: initial?.published ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  function toSlug(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
  }

  function set(key: keyof Article, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function save(publish?: boolean) {
    setSaving(true)
    setError('')
    try {
      const payload = { ...form }
      if (publish !== undefined) payload.published = publish
      const res = await fetch(
        initial?.id ? `/api/admin/articles/${initial.id}` : '/api/admin/articles',
        {
          method: initial?.id ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Gagal menyimpan')
      }
      router.push('/admin/artikel')
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setSaving(false)
    }
  }

  async function deleteArticle() {
    if (!initial?.id) return
    if (!confirm('Hapus artikel ini? Tindakan tidak dapat dibatalkan.')) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/articles/${initial.id}`, { method: 'DELETE' })
      router.push('/admin/artikel')
      router.refresh()
    } catch {
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-xs text-red-600">{error}</div>
      )}

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Judul Artikel *</label>
          <input
            value={form.title}
            onChange={e => {
              set('title', e.target.value)
              if (!initial?.id) set('slug', toSlug(e.target.value))
            }}
            placeholder="Masukkan judul artikel..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#033F85] focus:ring-1 focus:ring-[#033F85]"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Slug URL *</label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#033F85] focus-within:ring-1 focus-within:ring-[#033F85]">
            <span className="px-3 py-2 text-xs text-gray-400 bg-gray-50 border-r border-gray-200">/artikel/</span>
            <input
              value={form.slug}
              onChange={e => set('slug', toSlug(e.target.value))}
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Category + Emoji + Read time */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#033F85]"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Emoji</label>
            <select
              value={form.emoji}
              onChange={e => set('emoji', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#033F85]"
            >
              {EMOJIS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Waktu Baca</label>
            <input
              value={form.readTime}
              onChange={e => set('readTime', e.target.value)}
              placeholder="5 menit"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#033F85]"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ringkasan (excerpt)</label>
          <textarea
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            rows={2}
            placeholder="Ringkasan singkat artikel (tampil di daftar artikel)..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#033F85] focus:ring-1 focus:ring-[#033F85] resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Konten Artikel *</label>
          <textarea
            value={form.content}
            onChange={e => set('content', e.target.value)}
            rows={20}
            placeholder="Tulis isi artikel di sini. Pisahkan paragraf dengan baris kosong..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#033F85] focus:ring-1 focus:ring-[#033F85] resize-y"
          />
          <p className="text-xs text-gray-400 mt-1">Pisahkan paragraf dengan baris kosong. Judul bagian bisa dimulai dengan angka (1. 2. 3.) atau nama bagian.</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            {initial?.id && (
              <button
                onClick={deleteArticle}
                disabled={deleting}
                className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded border border-red-200 hover:bg-red-50 transition-colors"
              >
                {deleting ? 'Menghapus...' : 'Hapus'}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="text-sm font-semibold border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Simpan Draft
            </button>
            <button
              onClick={() => save(true)}
              disabled={saving || !form.title || !form.content}
              className="text-sm font-bold bg-[#033F85] text-white px-5 py-2 rounded-lg hover:bg-[#022D5E] transition-colors disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Publikasikan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
