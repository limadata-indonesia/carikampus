import { MetadataRoute } from 'next'
import { APP_CONFIG } from '@/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_CONFIG.url

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/cari`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tes-minat`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/artikel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/masuk`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/daftar/siswa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/daftar/universitas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
