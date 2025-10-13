/**
 * Linktree Alternative Category Page
 * Dedicated page for bio link / link-in-bio features
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, CheckCircle, Link2, TrendingUp, Users, BarChart3, Palette, Shield, Zap } from 'lucide-react';
import { generateMetadata as generateMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/seo/InternalLinks';
import { ArticleSchema, FAQSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = generateMeta({
  title: 'Best Linktree Alternative - Free Bio Link Tool | OrangeURL',
  description: 'Looking for a Linktree alternative? OrangeURL offers free bio link pages with custom branding, analytics, and unlimited links. Perfect for Instagram, TikTok, and all social media.',
  keywords: [
    'linktree alternative',
    'free linktree alternative',
    'bio link',
    'link in bio',
    'linktree free alternative',
    'cheaper than linktree',
    'bio link page',
    'instagram bio link',
    'tiktok bio link',
    'link in bio tool',
    'social media bio link',
  ],
  path: '/g/category/linktree-alternative',
});

const articles = [
  {
    title: 'Linktree vs OrangeURL: Complete Comparison 2025',
    slug: 'linktree-vs-orangeurl-comparison',
    excerpt: 'Detailed comparison of Linktree and OrangeURL. Discover which bio link tool offers better features, pricing, and analytics for your social media.',
    readTime: '12 min',
    date: 'Jan 15, 2025',
    tags: ['Comparison', 'Linktree', 'Bio Links'],
  },
  {
    title: 'How to Create a Free Bio Link Page in 5 Minutes',
    slug: 'create-free-bio-link-page-guide',
    excerpt: 'Step-by-step guide to creating your bio link page for free. Perfect for Instagram, TikTok, Twitter, and all social platforms.',
    readTime: '8 min',
    date: 'Jan 12, 2025',
    tags: ['Tutorial', 'Bio Links', 'Beginners'],
  },
  {
    title: 'Instagram Bio Link Best Practices for 2025',
    slug: 'instagram-bio-link-best-practices',
    excerpt: 'Maximize clicks on your Instagram bio link. Learn proven strategies to increase traffic and conversions from your Instagram profile.',
    readTime: '10 min',
    date: 'Jan 10, 2025',
    tags: ['Instagram', 'Social Media', 'Best Practices'],
  },
  {
    title: 'TikTok Link in Bio: Complete Strategy Guide',
    slug: 'tiktok-link-in-bio-strategy',
    excerpt: 'Drive massive traffic from TikTok with an optimized link in bio. Strategies used by top creators to convert views into website visits.',
    readTime: '9 min',
    date: 'Jan 8, 2025',
    tags: ['TikTok', 'Content Creators', 'Strategy'],
  },
  {
    title: 'Why Influencers Are Switching from Linktree',
    slug: 'why-influencers-switch-from-linktree',
    excerpt: 'Discover why thousands of influencers are leaving Linktree for better alternatives. Cost, features, and flexibility comparison.',
    readTime: '7 min',
    date: 'Jan 5, 2025',
    tags: ['Influencers', 'Linktree', 'Migration'],
  },
  {
    title: 'Bio Link Analytics: Track What Really Matters',
    slug: 'bio-link-analytics-guide',
    excerpt: 'Learn which bio link metrics matter most. Track clicks, conversions, and ROI from your link in bio with advanced analytics.',
    readTime: '11 min',
    date: 'Jan 3, 2025',
    tags: ['Analytics', 'Tracking', 'Data'],
  },
];

const faqs = [
  {
    question: 'What is the best free alternative to Linktree?',
    answer: 'OrangeURL is one of the best free Linktree alternatives, offering unlimited links, custom branding, analytics, and QR codes - all for free. Unlike Linktree\'s limited free tier, OrangeURL provides professional features without restrictions.',
  },
  {
    question: 'Is OrangeURL really free?',
    answer: 'Yes! OrangeURL offers a completely free plan with bio link pages, unlimited links, basic analytics, and custom short URLs. Premium features like custom domains and advanced analytics are available for just $5/month, much cheaper than Linktree\'s $5/month basic plan.',
  },
  {
    question: 'Can I use OrangeURL bio links on Instagram and TikTok?',
    answer: 'Absolutely! OrangeURL bio links work perfectly on Instagram, TikTok, Twitter, YouTube, and all social media platforms. Your bio link is mobile-optimized and loads super fast.',
  },
  {
    question: 'How is OrangeURL different from Linktree?',
    answer: 'OrangeURL combines bio link pages with full URL shortening and link management. You get bio links PLUS short links, QR codes, and advanced analytics - all in one platform. Linktree only offers bio link pages.',
  },
  {
    question: 'Can I track analytics on my bio link?',
    answer: 'Yes! Every bio link includes detailed analytics showing total clicks, individual link performance, traffic sources, devices, locations, and click-through rates. Premium plans offer even more advanced insights.',
  },
  {
    question: 'Can I customize my bio link page?',
    answer: 'Yes! Customize your bio link page with custom colors, fonts, backgrounds, buttons, and your own branding. Premium plans allow custom domains like bio.yourbrand.com.',
  },
  {
    question: 'How many links can I add to my bio page?',
    answer: 'Unlimited! Add as many links as you want to your bio page. There are no restrictions on the number of links, even on the free plan.',
  },
  {
    question: 'Is it easy to migrate from Linktree to OrangeURL?',
    answer: 'Super easy! Simply copy your links from Linktree and paste them into OrangeURL. The whole process takes less than 5 minutes. We also offer migration assistance for premium users.',
  },
];

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Guides', href: '/g' },
  { name: 'Linktree Alternative', href: '/g/category/linktree-alternative' },
];

export default function LinktreeAlternativePage() {
  return (
    <>
      <ArticleSchema
        title="Best Linktree Alternative - Free Bio Link Tool"
        description="Discover the best Linktree alternative with OrangeURL. Free bio link pages with custom branding, analytics, and unlimited links for Instagram, TikTok, and all social media."
        url="https://app.orangeurl.live/g/category/linktree-alternative"
        image="https://app.orangeurl.live/images/og-image.png"
        datePublished="2024-01-01T00:00:00Z"
        dateModified={new Date().toISOString()}
        author="OrangeURL Team"
      />
      <FAQSchema items={faqs} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="text-6xl mb-4">🔗</div>
          <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
            Free Forever • No Credit Card Required
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Best Linktree Alternative
            <span className="block mt-2 gradient-text-primary">Free Bio Link Pages</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Create a stunning bio link page for Instagram, TikTok, and all social media. Get unlimited links, 
            custom branding, and detailed analytics - all for free. No restrictions, no hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="btn-primary text-lg px-10 py-6" asChild>
              <Link href="/bio">
                Create Your Bio Link Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
              <Link href="/pricing">Compare Plans</Link>
            </Button>
          </div>
        </div>

        {/* Comparison vs Linktree */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">OrangeURL vs Linktree</h2>
          <Card className="border-2">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-4 text-left font-semibold">Feature</th>
                      <th className="p-4 text-center font-semibold">OrangeURL</th>
                      <th className="p-4 text-center font-semibold">Linktree</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Unlimited Links', orangeurl: true, linktree: '5 links only' },
                      { feature: 'Custom Branding', orangeurl: true, linktree: 'Pro only ($5/mo)' },
                      { feature: 'Analytics', orangeurl: true, linktree: 'Limited' },
                      { feature: 'QR Codes', orangeurl: true, linktree: 'Pro only' },
                      { feature: 'URL Shortening', orangeurl: true, linktree: false },
                      { feature: 'Custom Domain', orangeurl: '$5/mo', linktree: '$9/mo' },
                      { feature: 'Remove Branding', orangeurl: true, linktree: 'Pro only' },
                      { feature: 'Link Scheduling', orangeurl: true, linktree: 'Pro only' },
                      { feature: 'Free Plan', orangeurl: 'Full featured', linktree: 'Very limited' },
                    ].map((row, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.orangeurl === 'boolean' ? (
                            row.orangeurl ? (
                              <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-red-500">✗</span>
                            )
                          ) : (
                            <span className="text-green-600 font-semibold">{row.orangeurl}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.linktree === 'boolean' ? (
                            row.linktree ? (
                              <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-red-500">✗</span>
                            )
                          ) : (
                            <span className="text-muted-foreground">{row.linktree}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose OrangeURL Over Linktree?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Link2 className="w-8 h-8" />,
                title: 'Unlimited Links',
                description: 'Add unlimited links to your bio page. No restrictions, ever.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Advanced Analytics',
                description: 'Track every click with detailed insights and performance metrics.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Full Customization',
                description: 'Customize colors, fonts, backgrounds, and buttons to match your brand.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'URL Shortening',
                description: 'Bonus: Create short links for all your content, not just bio pages.',
                gradient: 'from-orange-500 to-red-500',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'No Ads, Ever',
                description: 'Your bio page, your brand. We never show ads or our branding.',
                gradient: 'from-red-500 to-pink-500',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Built for Creators',
                description: 'Designed for influencers, content creators, and businesses.',
                gradient: 'from-amber-500 to-orange-500',
              },
            ].map((feature, index) => (
              <Card key={index} className="card-hover border-2 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Instagram Influencers',
                description: 'Share all your links in your Instagram bio. Track which content drives the most clicks.',
                emoji: '📸',
              },
              {
                title: 'TikTok Creators',
                description: 'Convert your TikTok views into website visits with a professional link in bio.',
                emoji: '🎵',
              },
              {
                title: 'YouTubers',
                description: 'One link for all your socials, merch, sponsors, and latest videos.',
                emoji: '🎬',
              },
              {
                title: 'Small Businesses',
                description: 'Showcase products, services, contact info, and social media in one place.',
                emoji: '🏪',
              },
              {
                title: 'Content Creators',
                description: 'Promote your latest content, affiliate links, and collaborations efficiently.',
                emoji: '✨',
              },
              {
                title: 'Musicians & Artists',
                description: 'Share music, events, merch, and booking info from one customized page.',
                emoji: '🎤',
              },
            ].map((useCase, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="text-4xl">{useCase.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Guides & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <Link key={index} href={`/blog/${article.slug}`}>
                <Card className="card-hover h-full border-2 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                      <span className="text-sm text-muted-foreground">• {article.date}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade from Linktree?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators and businesses who switched to OrangeURL for better features at better prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-10 py-6" asChild>
              <Link href="/bio">
                Create Free Bio Link
                <TrendingUp className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Set up in 2 minutes • Cancel anytime
          </p>
        </div>
      </div>
    </>
  );
}

