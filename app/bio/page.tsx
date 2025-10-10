'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles,
  Instagram,
  Twitter,
  Globe,
  Music,
  FileText,
  Link as LinkIcon,
  TrendingUp,
  Palette,
  Zap,
  Crown,
  ArrowRight,
  Bell,
  Youtube,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { useState, useEffect } from 'react';

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

export default function BioPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Bio Feature');

  // Handle waitlist events
  useEffect(() => {
    const handleOpenWaitlist = (event: CustomEvent) => {
      setSelectedPlan(event.detail.plan);
      setWaitlistOpen(true);
    };

    window.addEventListener('openWaitlist', handleOpenWaitlist as EventListener);
    return () => window.removeEventListener('openWaitlist', handleOpenWaitlist as EventListener);
  }, []);

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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-4 h-4 mr-2" />
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your <span className="gradient-text-primary">Bio Page</span>,
            <br />Powered by OrangeURL
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Showcase your products, share your portfolio, or create a professional link hub. Perfect for creators, brands, and businesses looking to connect with their audience.
          </p>
        </motion.div>
      </motion.section>

      {/* Template Showcase Grid */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Template 1: Link Hub */}
        <motion.div variants={fadeInUp} className="h-full">
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl relative bg-gradient-to-b from-orange-200 via-amber-100 to-orange-50 dark:from-orange-900 dark:via-amber-900 dark:to-orange-800 h-full flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-400 to-transparent opacity-40 rounded-t-[2.5rem]" />
            
            <div className="p-8 space-y-6 relative z-10 flex-1 flex flex-col">
              <div className="text-center space-y-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative inline-block"
                >
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-400 rounded-full opacity-60" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-400 rounded-full opacity-60" />
                  
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                    <Image
                      src="/images/user_logo.png"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -top-1 -left-1 text-2xl">⚡</div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">😊</div>
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    Yusii Xu
                  </h2>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Content Creator
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 flex-1 flex flex-col justify-center">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-sm border-2 border-gray-800 dark:border-white rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Instagram className="w-5 h-5 text-gray-800 dark:text-gray-900" />
                    <span className="font-bold text-base text-gray-800 dark:text-gray-900 uppercase tracking-wide">
                      Instagram
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-sm border-2 border-gray-800 dark:border-white rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Twitter className="w-5 h-5 text-gray-800 dark:text-gray-900" />
                    <span className="font-bold text-base text-gray-800 dark:text-gray-900 uppercase tracking-wide">
                      X
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-sm border-2 border-gray-800 dark:border-white rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5 text-gray-800 dark:text-gray-900" />
                    <span className="font-bold text-base text-gray-800 dark:text-gray-900 uppercase tracking-wide">
                      Medium
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-sm border-2 border-gray-800 dark:border-white rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Youtube className="w-5 h-5 text-gray-800 dark:text-gray-900" />
                    <span className="font-bold text-base text-gray-800 dark:text-gray-900 uppercase tracking-wide">
                      YouTube
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="text-center pt-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  @yusiixu
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm font-semibold text-muted-foreground mt-4">
            Link Hub Template
          </p>
        </motion.div>

        {/* Template 2: Product Showcase */}
        <motion.div variants={fadeInUp}>
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl relative h-full" style={{
            background: 'linear-gradient(180deg, #6B9BD1 0%, #8BB5E0 50%, #A8C9E8 100%)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E"), linear-gradient(180deg, #6B9BD1 0%, #8BB5E0 50%, #A8C9E8 100%)',
          }}>
            <div className="p-8 space-y-4 relative z-10 h-full flex flex-col">
              {/* Brand Badge */}
              <div className="text-center pt-4">
                <div className="inline-block px-4 py-1.5 border-2 border-yellow-400 rounded-full bg-transparent">
                  <p className="text-[10px] font-bold text-yellow-400 tracking-wide">Yusii Xu</p>
                </div>
              </div>

              {/* Title */}
              <div className="text-center space-y-0">
                <h2 className="text-5xl font-black text-yellow-300 leading-none" style={{ 
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  letterSpacing: '0.05em'
                }}>
                  PRODUCT
                </h2>
                <h3 className="text-4xl font-black text-yellow-200 italic leading-none" style={{ 
                  fontFamily: 'Georgia, Times, serif',
                  letterSpacing: '0.02em'
                }}>
                  Showcase
                </h3>
              </div>

              {/* Product Receipt Card */}
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-2xl p-3 shadow-2xl flex-1">
                {/* Paper top edge effect */}
                <div className="relative">
                  <div className="absolute -top-3 left-0 right-0 h-3 flex justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded-b-full" />
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {/* Product Image */}
                  <div className="aspect-square bg-white rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-200">
                    <Image
                      src="/images/shopping.png"
                      alt="Product"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t-2 border-b-2 border-gray-900 py-2">
                    <h4 className="font-black text-center text-xs uppercase tracking-wider text-gray-900">
                      Premium Sunglasses
                    </h4>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <p className="text-lg font-black text-green-600">$100</p>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="px-2">
                    <p className="text-[11px] text-center leading-tight text-gray-800">
                      "Premium quality sunglasses with modern design. Perfect for any occasion, stylish and durable."
                    </p>
                  </div>

                  {/* Barcode */}
                  <div className="pt-1">
                    <div className="h-10 bg-white rounded flex items-end justify-center pb-1">
                      <svg width="180" height="32" viewBox="0 0 180 32">
                        {[...Array(40)].map((_, i) => (
                          <rect 
                            key={i} 
                            x={i * 4.5} 
                            y="0" 
                            width={Math.random() > 0.5 ? "2" : "1"} 
                            height="32" 
                            fill="black"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom zigzag edge */}
                <div className="relative h-3 overflow-hidden">
                  <div className="absolute -bottom-1.5 left-0 right-0 flex justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-white rounded-t-full" />
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="bg-gray-700 rounded-full py-2.5 px-4 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[11px] leading-tight">
                    <span className="text-yellow-300 font-normal">Check the product at </span>
                    <span className="text-yellow-300 font-bold">orangeurl.live/yusiixu</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm font-semibold text-muted-foreground mt-4">
            Product Showcase Template
          </p>
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="space-y-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create an amazing link in bio experience
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {[
            {
              title: "Beautiful Templates",
              description: "Choose from stunning pre-designed templates or create your own custom design",
              icon: <Palette className="w-6 h-6" />,
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Unlimited Links",
              description: "Add as many links as you want. Perfect for all your social media profiles",
              icon: <LinkIcon className="w-6 h-6" />,
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Real-time Analytics",
              description: "Track clicks, views, and engagement for each link in your bio",
              icon: <TrendingUp className="w-6 h-6" />,
              gradient: "from-orange-500 to-red-500"
            },
            {
              title: "Custom Branding",
              description: "Add your logo, colors, and fonts to match your personal brand",
              icon: <Crown className="w-6 h-6" />,
              gradient: "from-amber-500 to-orange-500"
            },
            {
              title: "Lightning Fast",
              description: "Optimized for speed. Your bio page loads instantly on any device",
              icon: <Zap className="w-6 h-6" />,
              gradient: "from-green-500 to-emerald-500"
            },
            {
              title: "Mobile Optimized",
              description: "Looks perfect on all devices, especially mobile where it matters most",
              icon: <Sparkles className="w-6 h-6" />,
              gradient: "from-pink-500 to-rose-500"
            }
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="card-hover h-full border-2 hover:border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Use Cases */}
      <motion.section 
        className="space-y-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Perfect For</h2>
          <p className="text-xl text-muted-foreground">
            Who benefits from OrangeURL Bio?
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={staggerContainer}
        >
          {[
            { title: "Content Creators", icon: "🎥" },
            { title: "Musicians", icon: "🎵" },
            { title: "Influencers", icon: "✨" },
            { title: "Small Business", icon: "🏪" }
          ].map((useCase, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="card-hover text-center border-2 hover:border-primary/20">
                <CardContent className="p-8 space-y-3">
                  <div className="text-5xl mb-2">{useCase.icon}</div>
                  <h3 className="font-bold text-lg">{useCase.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="text-center py-16 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-sm font-medium">
            <Bell className="w-4 h-4 mr-2" />
            Be the First to Know
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Launching Soon!</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the waitlist to get early access to OrangeURL Bio and exclusive launch benefits.
          </p>
          <Button 
            size="lg" 
            className="btn-primary text-lg px-10 py-6"
            onClick={() => {
              const event = new CustomEvent('openWaitlist', { detail: { plan: 'Bio Feature' } });
              window.dispatchEvent(event);
            }}
          >
            Join Waitlist
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.section>

      {/* Waitlist Dialog */}
      <WaitlistDialog 
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
}

