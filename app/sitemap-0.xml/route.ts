import { NextRequest, NextResponse } from 'next/server';
import { SITEMAP_CHUNK_SIZE, getProgrammaticItem } from '@/lib/seo/programmaticData';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://app.orangeurl.live';
  const index = 0;
  const start = index * SITEMAP_CHUNK_SIZE;
  const end = start + SITEMAP_CHUNK_SIZE;
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (let i = start; i < end; i++) {
    const item = getProgrammaticItem(i);
    if (item) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/seo/${item.slug}</loc>\n`;
      xml += `    <lastmod>${item.updatedAt}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    }
  }
  
  xml += '</urlset>';
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}


