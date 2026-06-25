// Types - mirrors Prisma schema without requiring generated client
// These will be replaced by Prisma generated types after: npx prisma generate

export type UserRole = 'STUDENT' | 'UNIVERSITY_ADMIN' | 'SCHOOL_ADMIN' | 'PLATFORM_ADMIN'
export type UniversityType = 'NEGERI' | 'PRIVATE' | 'KEAGAMAAN' | 'KEDINASAN'
export type UniversityStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'PAID' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED'
export type TestStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
export type TestPackage = 'BASIC' | 'FULL' | 'FAMILY'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED'
export type AccessSource = 'PURCHASE' | 'SCHOOL_CODE' | 'VOUCHER' | 'MANUAL_GRANT'

export interface University {
  id: string; name: string; slug: string; logo?: string
  type: UniversityType; accreditation?: string
  province: string; city: string; address?: string
  phone?: string; email?: string; website?: string
  description?: string; founded?: number
  totalStudents?: number; totalFaculties?: number; qsRanking?: number
  registrationFee: number; status: UniversityStatus
  createdAt: Date; updatedAt: Date
}

export interface Faculty { id: string; universityId: string; name: string }
export interface Program { id: string; facultyId: string; name: string; degree: string; accreditation?: string; duration?: number }

export interface UniversityWithRelations extends University {
  faculties: (Faculty & { programs: Program[] })[]
  _count: { reviews: number; applications: number; savedBy: number }
  reviews: { rating: number }[]
}

export interface RIASECScore { R: number; I: number; A: number; S: number; E: number; C: number }

export interface ProgramRecommendation {
  name: string; degree: string; universityName: string; matchPercent: number
}

export interface ApiResponse<T = unknown> {
  data?: T; error?: string; message?: string
}
