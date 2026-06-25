// Prisma client - initialized at runtime after `prisma generate` is run
// Run: npx prisma generate && npx prisma db push

let db: any

try {
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as any
  db = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
} catch {
  // Prisma client not generated yet - run: npx prisma generate
  db = null
}

export { db }
