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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
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
        viewport={{ once: true }}
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
              <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-orange-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground mt-2">Sub-second response times</p>
                </CardContent>
              </Card>
              <Card className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Secure</h3>
                  <p className="text-sm text-muted-foreground mt-2">Enterprise-grade protection</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 pt-8">
              <Card className="card-hover bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Global</h3>
                  <p className="text-sm text-muted-foreground mt-2">Worldwide CDN coverage</p>
                </CardContent>
              </Card>
              <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">User-First</h3>
                  <p className="text-sm text-muted-foreground mt-2">Built for your success</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Values */}
      <motion.section 
        className="space-y-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These principles guide everything we do and every decision we make
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {[
            {
              icon: <Target className="w-8 h-8" />,
              title: "Simplicity First",
              description: "We believe the best solutions are often the simplest ones. Every feature is designed with clarity and ease of use in mind.",
              gradient: "from-orange-500 to-red-500"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Privacy & Security",
              description: "Your data is yours. We use industry-leading security practices to protect your information and respect your privacy.",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community Driven",
              description: "Our users are at the heart of everything we do. Your feedback shapes our roadmap and drives our innovation.",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((value, index) => (
            <motion.div 
              key={index} 
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full card-hover border-2 hover:border-primary/20 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-5 hover:opacity-10 transition-opacity`} />
                <CardContent className="p-8 space-y-6 relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {value.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Stats */}
      <motion.section 
        className="py-16 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-orange-500/5 to-primary/5 rounded-3xl" />
        
        <div className="relative z-10 space-y-12">
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">By the Numbers</h2>
            <p className="text-xl text-muted-foreground">
              The impact we're making together
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {[
              { number: "1M+", label: "Links Created", icon: <TrendingUp className="w-6 h-6" /> },
              { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
              { number: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> },
              { number: "150+", label: "Countries", icon: <Globe className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center space-y-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center text-primary mb-2">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text-primary">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section 
        className="space-y-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate people behind OrangeURL
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
        >
          {[
            {
              name: "Alex Chen",
              role: "Founder & CEO",
              bio: "Former tech lead at major URL shortening services. Passionate about building tools that make the web better.",
              avatar: "AC"
            },
            {
              name: "Sarah Rodriguez",
              role: "Head of Engineering",
              bio: "Full-stack engineer with 10+ years building scalable web applications. Coffee enthusiast and open source contributor.",
              avatar: "SR"
            },
            {
              name: "Mike Johnson",
              role: "Head of Design",
              bio: "UX/UI designer focused on creating intuitive interfaces. Believes great design is invisible until you need it.",
              avatar: "MJ"
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="card-hover text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                    {member.avatar}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="text-center py-16 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl" />
        
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Join Us?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of the next generation of URL shortening. Start creating better links today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="btn-primary text-lg px-10 py-6" asChild>
              <Link href="/">Start Shortening</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 