'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronDown,
  Link as LinkIcon,
  BarChart3,
  Shield,
  CreditCard,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "General",
    icon: <HelpCircle className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500",
    faqs: [
      {
        question: "What is OrangeURL?",
        answer: "OrangeURL is a modern URL shortening service that helps you create short, memorable links from long URLs. We offer features like custom short links, QR codes, analytics, and more to help you manage and track your links effectively."
      },
      {
        question: "Is OrangeURL free to use?",
        answer: "Yes! We offer a free tier that allows you to create shortened URLs. During our trial phase, you can even get Pro features for free by logging in. Links in the trial phase expire after 24 hours. Paid plans offer additional features like custom domains, advanced analytics, and permanent links."
      },
      {
        question: "How long do my links last?",
        answer: "During the trial phase, links expire after 24 hours for non-logged-in users. Once you sign up or when we launch officially, free tier links will be permanent, and paid tier links include guaranteed uptime and priority support."
      },
      {
        question: "Do I need an account to create short links?",
        answer: "No, you can create short links without an account during our trial phase. However, creating an account gives you access to analytics, link management, custom short URLs, and other premium features."
      }
    ]
  },
  {
    title: "Features",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
    faqs: [
      {
        question: "What are custom short links?",
        answer: "Custom short links allow you to create memorable, branded URLs instead of random characters. For example, instead of 'orangeurl.live/x7k2p', you can create 'orangeurl.live/my-product'. This feature requires a Pro account."
      },
      {
        question: "Can I generate QR codes for my links?",
        answer: "Yes! Pro users can generate custom-styled QR codes with OrangeURL branding. You can choose from multiple styles (Classic, Rounded, Gradient, Minimal, Dots) and download them for use in marketing materials."
      },
      {
        question: "What is the Bio feature?",
        answer: "Bio (coming soon) is our Linktree-style feature that lets you create a beautiful landing page with all your important links in one place. Perfect for social media profiles, especially Instagram and TikTok where you can only have one link in bio."
      },
      {
        question: "How does AI-powered short URL generation work?",
        answer: "Our AI feature (Pro only) analyzes your destination URL and generates meaningful, relevant short URLs automatically. Instead of random characters, you get contextual short links that are easier to remember and share."
      }
    ]
  },
  {
    title: "Analytics",
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500",
    faqs: [
      {
        question: "What analytics can I track?",
        answer: "With a Pro account, you can track click counts, geographic data (countries and cities), referrer sources, device types (desktop/mobile), and click timestamps. All data is updated in real-time."
      },
      {
        question: "How long is analytics data stored?",
        answer: "Free tier users get 30 days of analytics history. Pro users get unlimited analytics history with the ability to export data in CSV format."
      },
      {
        question: "Can I see who clicked my links?",
        answer: "We respect user privacy and comply with GDPR. We track anonymous aggregate data like country, device type, and referrer, but we don't track personally identifiable information."
      }
    ]
  },
  {
    title: "Security & Privacy",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
    faqs: [
      {
        question: "Are shortened links safe?",
        answer: "Yes! We scan all URLs for malicious content and phishing attempts. We also use SSL encryption for all shortened links to ensure secure redirects."
      },
      {
        question: "Do you sell my data?",
        answer: "Absolutely not. We never sell your data to third parties. We only use analytics data to provide you with insights about your links. Read our Privacy Policy for full details."
      },
      {
        question: "Can I delete my links?",
        answer: "Yes, you can delete any links you've created from your dashboard. Once deleted, the short URL will stop working and all associated data will be removed."
      },
      {
        question: "Is OrangeURL GDPR compliant?",
        answer: "Yes, we are fully GDPR compliant. We collect minimal data, provide transparency about data usage, and give you full control over your data including the right to deletion."
      }
    ]
  },
  {
    title: "Billing",
    icon: <CreditCard className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-500",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express) and debit cards through our secure payment processor Stripe."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to Pro features until the end of your billing period."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 14-day money-back guarantee for annual plans. Monthly subscriptions are non-refundable, but you can cancel anytime to avoid future charges."
      },
      {
        question: "What happens if I downgrade to free tier?",
        answer: "Your existing links will continue to work, but you'll lose access to Pro features like custom URLs, advanced analytics, and QR code generation for new links. Existing custom links remain active."
      }
    ]
  }
];

function FAQAccordion({ faq }: { faq: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="border-b border-border/40 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-2 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="font-semibold text-lg pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 px-2 text-muted-foreground leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Frequently Asked <span className="gradient-text-primary">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about OrangeURL. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>
      </motion.section>

      {/* FAQ Categories */}
      <motion.section 
        className="space-y-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {faqCategories.map((category, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="border-2 border-border/40">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                </div>
                <div className="space-y-0">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQAccordion key={faqIndex} faq={faq} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Still Have Questions CTA */}
      <motion.section 
        className="text-center py-16 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl" />
        
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Still Have Questions?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our support team is here to help. Reach out anytime!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/support"
              className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Contact Support
            </a>
            <a 
              href="https://discord.gg/FvJtFw64WV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border-2 border-border hover:border-primary/50 transition-all hover:scale-105"
            >
              Join Discord
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}


