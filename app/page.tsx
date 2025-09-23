'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Link as LinkIcon, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import { isValidUrl, copyToClipboard } from '@/lib/utils';

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

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, expiry: 24 }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.short);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await copyToClipboard(shortUrl);
    }
  };

  return (
    <div className="space-y-32 overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-12 py-20 relative"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div variants={fadeInUp} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6 px-6 py-2 text-sm font-medium bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-0 rounded-full inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Lightning Fast URL Shortening
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            variants={fadeInUp}
          >
            <span className="block gradient-text-primary animate-gradient">
              Shorten Links,
            </span>
            <span className="block mt-2">
              Amplify Results
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Transform long URLs into short, memorable links instantly. Simple, fast, and reliable URL shortening service.
          </motion.p>
        </motion.div>

        {/* URL Shortener Form */}
        <motion.div 
          variants={fadeInUp}
          className="max-w-2xl mx-auto space-y-6"
        >
          <Card className="card-hover border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="url"
                    placeholder="Enter your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg h-12"
                  />
                  <Button 
                    onClick={handleShorten}
                    disabled={isLoading}
                    className="btn-primary h-12 px-8"
                  >
                    {isLoading ? 'Shortening...' : 'Shorten'}
                  </Button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {shortUrl && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <Input
                      value={shortUrl}
                      readOnly
                      className="bg-white dark:bg-gray-800"
                    />
                    <Button onClick={handleCopy} variant="outline">
                      Copy
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16"
        >
          {[
            { label: "Links Created", value: "1M+", icon: <LinkIcon className="w-6 h-6" /> },
            { label: "Active Users", value: "50K+", icon: <Users className="w-6 h-6" /> },
            { label: "Uptime", value: "99.9%", icon: <Clock className="w-6 h-6" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center text-primary mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold gradient-text-primary">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="space-y-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for professional link management with enterprise-grade performance
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {[
            {
              title: "Lightning Fast",
              description: "Generate short links in milliseconds with global CDN delivery",
              icon: <Zap className="w-8 h-8" />,
              gradient: "from-orange-500 to-red-500",
              features: ["Sub-second response", "Global CDN", "99.9% uptime"]
            },
            {
              title: "Advanced Analytics",
              description: "Track clicks, geographic data, and user behavior with detailed insights",
              icon: <BarChart3 className="w-8 h-8" />,
              gradient: "from-amber-500 to-orange-500",
              features: ["Real-time tracking", "Geographic data", "Click analytics"]
            },
            {
              title: "Enterprise Security",
              description: "Bank-grade security with encrypted links and fraud protection",
              icon: <Shield className="w-8 h-8" />,
              gradient: "from-red-500 to-pink-500",
              features: ["SSL encryption", "Fraud detection", "GDPR compliant"]
            },
            {
              title: "Custom Domains",
              description: "Use your own domain for branded short links that build trust",
              icon: <Globe className="w-8 h-8" />,
              gradient: "from-orange-600 to-amber-600",
              features: ["Custom domains", "Branded links", "White-label solution"]
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full card-hover group relative overflow-hidden border-2 hover:border-primary/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-8 space-y-6 relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-shadow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((feat, idx) => (
                        <div key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Pricing CTA Section */}
      <motion.section 
        className="text-center py-24 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-3xl" />
        
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Want a Custom Domain?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upgrade to Pro and use your own domain for branded short links that build trust with your audience
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" className="btn-primary text-lg px-10 py-6">
              Upgrade to Pro
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 group">
              <span>View Pricing</span>
              <TrendingUp className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-8 text-sm text-muted-foreground pt-8"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Custom domains</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Priority support</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
} 