import type { Metadata } from 'next'
import './globals.css'
import { APP_CONFIG } from '@/config'

export const metadata: Metadata = {
  title: { default: APP_CONFIG.name, template: `%s | ${APP_CONFIG.shortName}` },
  description: APP_CONFIG.description,
  metadataBase: new URL(APP_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: APP_CONFIG.url,
    siteName: APP_CONFIG.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
