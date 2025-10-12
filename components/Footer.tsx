import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg gradient-text-primary">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/features/short-links" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Short Links
                </Link>
              </li>
              <li>
                <Link 
                  href="/bio" 
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Bio
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-primary text-xs rounded-full">
                    Soon
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/features/lock-links" 
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Lock Links
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-primary text-xs rounded-full">
                    Soon
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  URL Shortener
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Link Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg gradient-text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link 
                  href="/support" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg gradient-text-primary">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Community */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg gradient-text-primary">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:feature@orangeurl.live" 
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Feature Requests
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@orangeurl.live" 
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/FvJtFw64WV" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <div className="text-sm text-muted-foreground">
            © 2025 OrangeURL. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Made with <span className="text-primary">❤</span> for businesses worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
