import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/test-firebase/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/test-firebase/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/test-firebase/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://lionel-portfolio.vercel.app/sitemap.xml',
    host: 'https://lionel-portfolio.vercel.app',
  }
} 