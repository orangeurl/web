'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Heart,
  Sparkles,
  ArrowRight,
  Award,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function AboutPage() {
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
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200/50 dark:border-orange-800/50 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Making the Web <span className="gradient-text-primary">More Connected</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            OrangeURL was born from a simple belief: every link should be fast, secure, and meaningful. 
            We're building the future of URL shortening, one click at a time.
          </p>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're on a mission to simplify the web by making URLs more manageable, trackable, and secure. 
            Our platform empowers businesses and individuals to create meaningful connections through 
            shortened links that don't just redirect—they tell a story.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're a social media manager, a marketer, or just someone who shares a lot of links, 
            we believe you deserve tools that are both powerful and easy to use.
          </p>
          <Button asChild className="btn-primary">
            <Link href="/pricing">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg gradient-text-primary">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground mt-2">Sub-second response times</p>
                </CardContent>
              </Card>
              <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">Secure</h3>
                  <p className="text-sm text-muted-foreground mt-2">Enterprise-grade protection</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 pt-8">
              <Card className="card-hover bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200/50 dark:border-green-800/50 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-green-600 dark:text-green-400">Global</h3>
                  <p className="text-sm text-muted-foreground mt-2">Worldwide CDN coverage</p>
                </CardContent>
              </Card>
              <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-purple-600 dark:text-purple-400">User-First</h3>
                  <p className="text-sm text-muted-foreground mt-2">Built for your success</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </motion.section>


      {/* CTA */}
      <motion.section 
        className="text-center py-16 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-orange-500/10 to-primary/5 rounded-3xl border-2 border-primary/10" />
        
        <div className="relative z-10 space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/50 dark:border-green-800/50 rounded-full text-sm font-semibold shadow-sm">
            <ArrowRight className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
            Join the Revolution
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Ready to <span className="gradient-text-primary">Join Us?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Be part of the next generation of URL shortening. Start creating better links today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="btn-primary text-base md:text-lg px-8 md:px-10 py-5 md:py-6 w-full sm:w-auto" asChild>
              <Link href="/">Start Shortening</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base md:text-lg px-8 md:px-10 py-5 md:py-6 border-2 hover:border-primary w-full sm:w-auto" asChild>
              <Link href="https://discord.gg/FvJtFw64WV" target="_blank" rel="noopener noreferrer">Join Community</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 