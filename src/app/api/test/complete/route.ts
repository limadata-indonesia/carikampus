import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

// RIASEC question IDs by category (IDs 1-54)
const RIASEC_MAP: Record<string, number[]> = {
  R: [1,2,3,4,5,6,7,8,9],
  I: [10,11,12,13,14,15,16,17,18],
  A: [19,20,21,22,23,24,25,26,27],
  S: [28,29,30,31,32,33,34,35,36],
  E: [37,38,39,40,41,42,43,44,45],
  C: [46,47,48,49,50,51,52,53,54],
}

// Cognitive correct answers (IDs 55-94)
const COGNITIVE_ANSWERS: Record<number, number> = {
  55:1, 56:1, 57:0, 58:1, 59:2, 60:1, 61:2, 62:2, 63:1, 64:1,
  65:2, 66:1, 67:1, 68:2, 69:1, 70:2, 71:0, 72:2, 73:2, 74:2,
  75:2, 76:1, 77:1, 78:2, 79:2, 80:2, 81:1, 82:1, 83:2, 84:2,
  85:2, 86:1, 87:2, 88:1, 89:0, 90:1, 91:3, 92:1, 93:1, 94:2,
}

const PROFILES: Record<string, { name: string; desc: string }> = {
  R: { name: 'Realistis', desc: 'Kamu menyukai pekerjaan yang konkret dan menggunakan keterampilan fisik atau teknis.' },
  I: { name: 'Investigatif', desc: 'Kamu tertarik pada riset, analisis, dan pemecahan masalah intelektual.' },
  A: { name: 'Artistik', desc: 'Kamu punya jiwa kreatif dan ekspresi diri adalah hal yang penting bagimu.' },
  S: { name: 'Sosial', desc: 'Kamu senang membantu, mengajar, dan bekerja bersama orang lain.' },
  E: { name: 'Enterprising', desc: 'Kamu memiliki jiwa kepemimpinan dan menyukai tantangan bisnis.' },
  C: { name: 'Konvensional', desc: 'Kamu menyukai keteraturan, detail, dan sistem yang terorganisir.' },
}

// Program recommendations by top RIASEC profile
const RECOMMENDATIONS: Record<string, string[]> = {
  R: ['Teknik Mesin', 'Teknik Sipil', 'Teknik Elektro', 'Arsitektur', 'Agroteknologi'],
  I: ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Teknik Informatika', 'Kedokteran'],
  A: ['Desain Komunikasi Visual', 'Seni Rupa', 'Arsitektur', 'Film & Televisi', 'Sastra'],
  S: ['Psikologi', 'Pendidikan', 'Kesehatan Masyarakat', 'Ilmu Sosial', 'Keperawatan'],
  E: ['Manajemen', 'Bisnis Internasional', 'Hukum', 'Ilmu Komunikasi', 'Kewirausahaan'],
  C: ['Akuntansi', 'Administrasi Bisnis', 'Ekonomi', 'Sistem Informasi', 'Statistika'],
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { sessionId, answers } = await req.json() as {
    sessionId: string
    answers: Record<string, number>
  }

  // Verify session belongs to user
  const testSession = await db.testSession.findUnique({ where: { id: sessionId } })
  if (!testSession || testSession.userId !== (session.user as any).id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Calculate RIASEC scores (sum of answers for each category, scale 9-45)
  const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  for (const [cat, ids] of Object.entries(RIASEC_MAP)) {
    scores[cat] = ids.reduce((sum, id) => sum + (answers[id] ?? 3), 0)
  }

  // Calculate cognitive score (% correct)
  let cogCorrect = 0
  for (const [id, correct] of Object.entries(COGNITIVE_ANSWERS)) {
    if (answers[Number(id)] === correct) cogCorrect++
  }
  const cognitiveScore = Math.round((cogCorrect / 40) * 100)

  // Top 2 RIASEC profile
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topProfile = sorted[0][0] + sorted[1][0]

  // Build recommendations
  const recs = [
    ...RECOMMENDATIONS[sorted[0][0]] ?? [],
    ...RECOMMENDATIONS[sorted[1][0]] ?? [],
  ].slice(0, 8).map(prog => ({ program: prog, match: Math.round(sorted[0][1] / 45 * 100) }))

  // Save results
  await db.testSession.update({
    where: { id: sessionId },
    data: { status: 'COMPLETED', completedAt: new Date(), answers },
  })

  const result = await db.testResult.create({
    data: {
      sessionId,
      riasecR: scores.R, riasecI: scores.I, riasecA: scores.A,
      riasecS: scores.S, riasecE: scores.E, riasecC: scores.C,
      topProfile,
      cognitiveScore,
      recommendations: recs,
    },
  })

  return NextResponse.json({ data: result })
}
