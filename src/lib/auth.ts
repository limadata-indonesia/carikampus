import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// PrismaAdapter will be enabled after running: npx prisma generate
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: { signIn: '/masuk', error: '/masuk' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() { return null },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.role = (user as any).role; token.id = user.id }
      return token
    },
    async session({ session, token }) {
      if (token) { (session.user as any).id = token.id; (session.user as any).role = token.role }
      return session
    },
  },
})
