import { MetadataRoute } from 'next'
import { APP_CONFIG } from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  }
}
