'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Sparkles
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
      { name: "Custom domains", included: false },
      { name: "Custom QR Codes", included: false },
      { name: "Priority support", included: false },
      { name: "AI shortener feature", included: false },
      { name: "Custom link expiry", included: false }
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
      { name: "5 Custom links per month", included: true },
      { name: "5 Custom QR Codes per month", included: true },
      { name: "Priority support", included: true },
      { name: "AI shortener feature", included: true },
      { name: "Custom link expiry", included: false }
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
      { name: "15 Custom links per month", included: true },
      { name: "15 Custom QR Codes per month", included: true },
      { name: "Priority support", included: true },
      { name: "AI shortener feature", included: true },
      { name: "Custom link expiry", included: true }
    ],
    buttonText: "Get Premium",
    buttonVariant: "outline" as const,
    popular: false
  }
];

export default function PricingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName);
    setWaitlistOpen(true);
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
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-primary to-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center shadow-lg">
                  <Crown className="w-4 h-4 mr-1.5" />
                  Most Popular
                </div>
              </div>
            )}
            
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
                <div className="space-y-3">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl md:text-5xl font-bold gradient-text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-base">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{plan.description}</p>
                </div>
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

      <WaitlistDialog 
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
} 