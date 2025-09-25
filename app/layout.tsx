import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OrangeURL - Fast & Secure URL Shortener',
  description: 'Create short, memorable links with advanced analytics and custom domains',
  keywords: ['URL shortener', 'Link shortener', 'Short links', 'Link management', 'Analytics'],
  authors: [{ name: 'OrangeURL Team' }],
  creator: 'OrangeURL',
  publisher: 'OrangeURL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://orangeurl.app'),
  openGraph: {
    title: 'OrangeURL - Fast & Secure URL Shortener',
    description: 'Create short, memorable links with advanced analytics',
    url: 'https://orangeurl.app',
    siteName: 'OrangeURL',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrangeURL - Fast & Secure URL Shortener',
    description: 'Create short, memorable links with advanced analytics',
    creator: '@orangeurl_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen relative flex flex-col">
            <ParticleBackground />
            <div className="relative z-10 flex flex-col flex-1">
              <Navbar />
              <main className="container mx-auto px-4 py-8 flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 