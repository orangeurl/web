/**
 * Dynamic Sitemap Generation
 * Generates multiple sitemaps for programmatic pages (50k limit per sitemap)
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  PROGRAMMATIC_TOTAL, 
  SITEMAP_CHUNK_SIZE, 
  getProgrammaticItem 
} from '@/lib/seo/programmaticData';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ index: string }> }
) {
  const params = await context.params;
  const index = parseInt(params.index);
  const baseUrl = 'https://app.orangeurl.live';
  
  // Calculate range for this sitemap
  const start = index * SITEMAP_CHUNK_SIZE;
  const end = Math.min(start + SITEMAP_CHUNK_SIZE, PROGRAMMATIC_TOTAL);
  
  if (start >= PROGRAMMATIC_TOTAL) {
    return new NextResponse('Sitemap not found', { status: 404 });
  }
  
  // Generate sitemap XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (let i = start; i < end; i++) {
    const item = getProgrammaticItem(i);
    if (item) {
      const priority = getPriority(item.category);
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/seo/${item.slug}</loc>\n`;
      xml += `    <lastmod>${item.updatedAt}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
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

function getPriority(category: string): number {
  const priorityMap: Record<string, number> = {
    'alternatives': 0.9,
    'use-cases': 0.8,
    'integrations': 0.8,
    'industries': 0.7,
    'solutions': 0.7,
    'guides': 0.6,
    'tools': 0.6,
    'resources': 0.5,
    'compare': 0.7,
    'local': 0.6,
    'hub': 0.5,
    'discover': 0.4,
  };
  
  return priorityMap[category] || 0.5;
}

