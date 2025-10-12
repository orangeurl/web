'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { 
  Check, 
  X, 
  Zap, 
  Globe, 
  BarChart3, 
  Shield, 
  Crown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal use and getting started",
    features: [
      { name: "5 links per month", included: true },
      { name: "Advanced analytics", included: true },
      { name: "1 month Analytics data retention", included: true },
      { name: "Custom Links", included: false },
      { name: "Custom QR Codes", included: false },
      { name: "Bio/Product links", included: false },
      { name: "Priority support", included: false },
      { name: "AI shortener feature", included: false },
      { name: "Custom link expiry", included: false },
      { name: "Lock Links", included: false }
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    description: "Ideal for professionals and profiles",
    features: [
      { name: "100 links per month", included: true },
      { name: "Advanced analytics", included: true },
      { name: "1 year Analytics data retention", included: true },
      { name: "5 Custom links per month", included: true },
      { name: "5 Custom QR Codes per month", included: true },
      { name: "1 Bio/Product links", included: true },
      { name: "Priority support", included: true },
      { name: "AI shortener feature", included: true },
      { name: "Custom link expiry", included: false },
      { name: "Lock Links", included: false }
    ],
    buttonText: "Get Pro",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Premium",
    price: "$15",
    period: "per month",
    description: "For power users and businesses",
    features: [
      { name: "500 links per month", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom Analytics data retention expiry", included: true },
      { name: "15 Custom links per month", included: true },
      { name: "15 Custom QR Codes per month", included: true },
      { name: "3 Bio/Product links", included: true },
      { name: "Priority support", included: true },
      { name: "AI shortener feature", included: true },
      { name: "Custom link expiry", included: true },
      { name: "Lock Links", included: true }
    ],
    buttonText: "Get Premium",
    buttonVariant: "outline" as const,
    popular: false
  }
];

export default function PricingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName);
    setWaitlistOpen(true);
  };

  // Add structured data for pricing and FAQ
  useEffect(() => {
    // Pricing Schema
    const pricingScript = document.createElement('script');
    pricingScript.type = 'application/ld+json';
    pricingScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'OrangeURL - URL Shortener Service',
      description: 'Affordable URL shortening and link management service with custom links, QR codes, and analytics',
      brand: {
        '@type': 'Brand',
        name: 'OrangeURL'
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Plan',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://app.orangeurl.live/pricing',
          description: 'Perfect for personal use - 5 links per month with advanced analytics'
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          price: '5.00',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock',
          url: 'https://app.orangeurl.live/pricing',
          description: 'Ideal for professionals - 100 links, 5 custom links, QR codes, and AI features per month',
          eligibleRegion: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI']
        },
        {
          '@type': 'Offer',
          name: 'Premium Plan',
          price: '15.00',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock',
          url: 'https://app.orangeurl.live/pricing',
          description: 'For power users - 500 links, 15 custom links, advanced features, and priority support',
          eligibleRegion: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI']
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '100'
      }
    });
    
    // FAQ Schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I upgrade or downgrade my plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can change your plan at any time. Changes take effect immediately and we\'ll prorate the billing accordingly.'
          }
        },
        {
          '@type': 'Question',
          name: 'What happens to my links if I downgrade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your existing links will continue to work. However, you may hit usage limits for new links based on your plan.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you offer refunds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer refunds until you haven\'t used any of the extra features that are supported with your plan after purchasing.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do QR codes work with my links?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every shortened link automatically gets a QR code. Pro and Premium plans allow custom QR code generation with your branding and colors.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does OrangeURL pricing compare to Bitly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OrangeURL Pro plan costs $5/month compared to Bitly\'s $29/month, saving you 83%. You get similar features including custom links, QR codes, and analytics at a fraction of the cost.'
          }
        }
      ]
    });
    
    document.head.appendChild(pricingScript);
    document.head.appendChild(faqScript);
    
    return () => {
      document.head.removeChild(pricingScript);
      document.head.removeChild(faqScript);
    };
  }, []);

  const getPrice = (plan: string) => {
    if (billingCycle === 'annual') {
      if (plan === 'Pro') return { price: '$50', period: 'per year', monthly: '$4.17/month' };
      if (plan === 'Premium') return { price: '$150', period: 'per year', monthly: '$12.50/month' };
    }
    if (plan === 'Pro') return { price: '$5', period: 'per month', monthly: null };
    if (plan === 'Premium') return { price: '$15', period: 'per month', monthly: null };
    return { price: '$0', period: 'forever', monthly: null };
  };

  return (
    <div className="space-y-20 py-12">
      {/* Header */}
      <motion.section 
        className="text-center space-y-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Choose Your <span className="gradient-text-primary">Perfect Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="relative inline-flex items-center bg-orange-50/50 dark:bg-orange-950/20 rounded-full p-1 border border-orange-200/50 dark:border-orange-800/50">
              <motion.div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-orange-500/90 to-red-500/90 rounded-full shadow-lg"
                initial={false}
                animate={{
                  x: billingCycle === 'monthly' ? 0 : '100%',
                  width: billingCycle === 'monthly' ? '50%' : '50%',
                }}
                transition={{
                  type: 'tween',
                  ease: [0.4, 0, 0.2, 1],
                  duration: 0.3,
                }}
                style={{
                  left: '4px',
                  right: '4px',
                }}
              />
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pay monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pay annually
              </button>
            </div>
          </div>
          {billingCycle === 'annual' && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-primary font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Save up to 17% with annual plans
            </motion.p>
          )}
        </motion.div>
      </motion.section>

      {/* Pricing Cards */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={fadeInUp}
            className="relative"
          >
            
            <Card className={`h-full card-hover relative overflow-hidden ${
              plan.popular 
                ? 'border-2 border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-br from-card via-card to-primary/5' 
                : 'border-2 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-secondary/5'
            }`}>
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
              )}
              
              <CardHeader className="text-center pb-6 md:pb-8 pt-8 md:pt-10 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{plan.name}</h3>
                <motion.div 
                  className="space-y-3"
                  key={billingCycle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl md:text-5xl font-bold gradient-text-primary">
                      {getPrice(plan.name).price}
                    </span>
                    <span className="text-muted-foreground ml-2 text-base">
                      /{getPrice(plan.name).period}
                    </span>
                  </div>
                  {getPrice(plan.name).monthly && (
                    <motion.p 
                      className="text-xs text-primary font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {getPrice(plan.name).monthly}
                    </motion.p>
                  )}
                  <p className="text-muted-foreground text-sm md:text-base">{plan.description}</p>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6 md:space-y-8 px-6 pb-8 relative z-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.buttonVariant}
                  size="lg" 
                  className={`w-full ${plan.popular ? 'btn-primary' : ''}`}
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Comparison */}
      <motion.section 
        className="space-y-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-5 md:space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/50 rounded-full text-sm font-semibold shadow-sm">
            <Shield className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            Why OrangeURL
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Why Choose <span className="gradient-text-primary">OrangeURL?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built for performance, designed for growth, trusted by professionals worldwide
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={staggerContainer}
        >
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Sub-second response times with global CDN delivery"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Enterprise Security",
              description: "Bank-grade security with SSL encryption and fraud protection"
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Detailed Analytics",
              description: "Track clicks, geographic data, and user behavior patterns"
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "Custom QR Codes",
              description: "Generate branded QR codes with custom colors and your logo"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/10 border border-border/30 hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="space-y-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-5 md:space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-200/50 dark:border-amber-800/50 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Frequently Asked <span className="gradient-text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
        >
          {[
            {
              question: "Can I upgrade or downgrade my plan?",
              answer: "Yes, you can change your plan at any time. Changes take effect immediately and we'll prorate the billing accordingly."
            },
            {
              question: "What happens to my links if I downgrade?",
              answer: "Your existing links will continue to work. However, you may hit usage limits for new links based on your plan."
            },
            {
              question: "Do you offer refunds?",
              answer: "Yes, we offer refunds until you haven't used any of the extra features that are supported with your plan after purchasing."
            },
            {
              question: "How do QR codes work with my links?",
              answer: "Every shortened link automatically gets a QR code. Pro and Premium plans allow custom QR code generation with your branding and colors."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/10 border border-border/30 hover:border-primary/20 transition-all"
            >
              <h3 className="text-base md:text-lg font-bold text-foreground">{faq.question}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Custom Plan CTA */}
      <motion.section 
        className="text-center py-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Card className="max-w-2xl mx-auto border-2 border-primary/20">
          <CardContent className="p-8 space-y-4">
            <h3 className="text-2xl font-bold">Need a Custom Plan?</h3>
            <p className="text-muted-foreground">
              Looking for enterprise features, higher limits, or custom integrations? 
              We'll create a plan tailored to your needs.
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:support@orangeurl.live" className="inline-flex items-center gap-2">
                Contact Us for Custom Pricing
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.section>

      <WaitlistDialog 
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
} 