'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      { name: "20 links per month", included: true },
      { name: "Basic analytics", included: true },
      { name: "Custom domains", included: false },
      { name: "Priority support", included: false },
      { name: "Custom link expiry", included: false },
      { name: "AI shortener feature", included: false }
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    description: "Ideal for professionals and small businesses",
    features: [
      { name: "200 links per month", included: true },
      { name: "Advanced analytics", included: true },
      { name: "5 Custom links per month", included: true },
      { name: "Priority support", included: true },
      { name: "Custom link expiry", included: true },
      { name: "AI shortener feature", included: true }
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: true
  }
];

export default function PricingPage() {
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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <Crown className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}
            
            <Card className={`h-full card-hover relative overflow-hidden ${
              plan.popular ? 'border-2 border-primary shadow-xl scale-105' : 'border-2 hover:border-primary/20'
            }`}>
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5" />
              )}
              
              <CardHeader className="text-center pb-8 relative z-10">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
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
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose OrangeURL?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for performance, designed for growth, trusted by professionals worldwide
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
              title: "Custom Domains",
              description: "Use your own domain for branded, professional short links"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
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
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
              answer: "No, we don't offer refunds."
            },
            {
              question: "Can I use my own domain?",
              answer: "Yes! Pro and Enterprise plans include custom domain support. You can use your own domain for branded short links."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>


    </div>
  );
} 