import { MetadataRoute } from 'next';
import { 
  getAllProgrammaticSlugs, 
  PROGRAMMATIC_TOTAL,
  getProgrammaticItem 
} from '@/lib/seo/programmaticData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://app.orangeurl.live';
  const currentDate = new Date();
  
  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/short-links`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/lock-links`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bitly-alternative`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comparison`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // SEO Hub pages
    {
      url: `${baseUrl}/g`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Add SEO Hub category pages
  const categories = [
    'linktree-alternative', // High priority - our bio feature
    'social-media-marketing', 'email-marketing', 'qr-codes', 'link-analytics',
    'influencer-marketing', 'affiliate-marketing', 'e-commerce', 'seo-optimization',
    'business-tools', 'mobile-marketing', 'content-marketing', 'brand-management'
  ];
  
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/g/category/${cat}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Add SEO Hub keyword pages
  const keywords = [
    'bitly-alternative', 'free-url-shortener', 'custom-short-links', 'qr-code-generator',
    'link-tracking', 'branded-links', 'bio-link', 'url-analytics',
    'short-link-seo', 'link-management', 'utm-tracking', 'campaign-links'
  ];
  
  const keywordPages: MetadataRoute.Sitemap = keywords.map((kw) => ({
    url: `${baseUrl}/g/keyword/${kw}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Generate programmatic SEO pages - simplified to avoid build timeouts
  const programmaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/seo/social-media`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo/email-marketing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo/qr-codes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo/link-analytics`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo/influencer-marketing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...corePages, ...categoryPages, ...keywordPages, ...programmaticPages];
}

// Determine priority based on category
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
