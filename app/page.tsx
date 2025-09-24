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
  Clock,
  X
} from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { isValidUrl, copyToClipboard } from '@/lib/utils';
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

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [customShort, setCustomShort] = useState('');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availability, setAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const { toast } = useToast();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Check availability function
  const checkAvailability = async (customShortValue: string) => {
    if (!customShortValue.trim()) {
      setAvailability(null);
      return;
    }

    setIsCheckingAvailability(true);
    try {
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customShort: customShortValue.trim() }),
      });

      const data = await response.json();
      setAvailability({
        available: data.available,
        message: data.message
      });
    } catch (error) {
      console.error('Availability check failed:', error);
      setAvailability({
        available: true,
        message: 'Unable to check availability'
      });
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  // Debounced availability checking
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (customShort.trim()) {
      debounceTimer.current = setTimeout(() => {
        checkAvailability(customShort);
      }, 500); // Check after 500ms of no typing
    } else {
      setAvailability(null);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [customShort]);

  const handleShorten = async () => {
    if (!url) {
      setError('Please enter a URL');
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (isLoading) {
      return;
    }

    // Check if custom short is taken before proceeding
    if (customShort.trim() && availability && !availability.available) {
      setError('Custom short is already taken. Please choose a different one.');
      toast({
        title: "Error",
        description: "Custom short is already taken",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const requestBody = { 
        url,
        ...(customShort.trim() && { short: customShort.trim() })
      };
      
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error || `Server error: ${response.status}`;
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (data.error) {
        setError(data.error);
        toast({
          title: "Error", 
          description: data.error,
          variant: "destructive",
        });
      } else {
        const shortUrl = data.shortUrl || data.CustomShort || data.short;
        setShortUrl(shortUrl);
        setError('');
        // Clear custom short after successful creation
        setCustomShort('');
        setAvailability(null);
        toast({
          title: "Success!",
          description: customShort ? `Custom short created: ${customShort}` : "URL shortened successfully",
        });
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
      toast({
        title: "Network Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback(async () => {
    if (shortUrl && !copied) {
      try {
        await copyToClipboard(shortUrl);
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "Short URL copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      }
    }
  }, [shortUrl, copied, toast]);

  // Add Enter key support for better UX
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && url) {
      e.preventDefault();
      handleShorten();
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
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="url"
                      placeholder="Enter your long URL here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="text-lg h-12"
                      onKeyPress={handleKeyPress}
                    />
                    <Button 
                      onClick={handleShorten}
                      disabled={isLoading}
                      className="btn-primary h-12 px-8"
                    >
                      {isLoading ? 'Shortening...' : 'Shorten'}
                    </Button>
                  </div>

                  {/* Custom Short Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Custom short (optional) - e.g., 'my-link'"
                        value={customShort}
                        onChange={(e) => setCustomShort(e.target.value)}
                        className="h-10"
                      />
                      {isCheckingAvailability && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                          Checking...
                        </div>
                      )}
                    </div>
                    
                    {/* Availability Status */}
                    {availability && !isCheckingAvailability && (
                      <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                        availability.available 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        {availability.available ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span>{availability.message}</span>
                        {availability.available && customShort && (
                          <span className="text-xs opacity-75">
                            → orangeurl.live/{customShort}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {shortUrl && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
                  >
                    <Input
                      value={shortUrl}
                      readOnly
                      className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-600"
                    />
                    <Button 
                      onClick={handleCopy} 
                      variant={copied ? "default" : "outline"}
                      className={copied ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
                      disabled={copied}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Login</span> to save your links and view detailed analytics
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16"
        >
          {[
            { label: "Links Created", value: "100+", icon: <LinkIcon className="w-6 h-6" /> },
            { label: "Active Users", value: "10+", icon: <Users className="w-6 h-6" /> },
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
              <div className="text-4xl font-bold gradient-text-primary">{stat.value}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Twitter Profile Demo */}
      <motion.section 
        className="space-y-16 py-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Track Your Social Media Performance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how influencers and creators use OrangeURL to track their bio links and grow their audience
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
          <Card className="card-hover border border-border/20 bg-orange-100/30 dark:bg-orange-800/15 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Twitter Profile Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-300 shadow-lg">
                  <Image
                    src="/images/snowiee-avatar.jpg"
                    alt="Snowiee Profile Picture"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold">Snowiee</h3>
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">@phpmeow</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    GSoC'24 @AnkiDroid, Electronics Major
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-500 border-blue-500"
                  onClick={() => window.open('https://x.com/phpmeow', '_blank')}
                >
                  Follow
                </Button>
              </div>

              {/* Bio Links */}
              <div className="space-y-3 bg-orange-100/40 dark:bg-orange-800/20 backdrop-blur-sm rounded-lg p-4 border border-border/20">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">My Links</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-orange-100/35 dark:bg-orange-800/18 backdrop-blur-sm rounded-lg border border-border/20">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">My Website</p>
                        <p className="text-xs text-primary font-mono">orangeurl.live/snowiee</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">824 clicks</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-100/35 dark:bg-orange-800/18 backdrop-blur-sm rounded-lg border border-border/20">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Resume</p>
                        <p className="text-xs text-primary font-mono">orangeurl.live/snowresume</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">1.5k clicks</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-100/35 dark:bg-orange-800/18 backdrop-blur-sm rounded-lg border border-border/20">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Favourite YouTube Video</p>
                        <p className="text-xs text-primary font-mono">orangeurl.live/favourite</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">342 clicks</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="text-xs text-muted-foreground">Total clicks this month</p>
                  <p className="text-sm font-semibold text-primary">2,666 clicks</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Track your social media performance like Snowiee
                </p>
                <Button className="btn-primary">
                  Create Your Bio Links
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="space-y-16 py-8"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-4 px-4"
          variants={staggerContainer}
        >
          {[
            {
              title: "Social Media Ready",
              description: "Perfect for Twitter, Instagram, and all social platforms with trackable links",
              icon: <Users className="w-8 h-8" />,
              gradient: "from-orange-500 to-red-500",
              features: ["Twitter integration", "Bio links", "Click tracking"]
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
              whileHover={{ y: -4, scale: 1.01 }}
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
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-background/50 text-xs rounded-full border border-border/20"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
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
          <h2 className="text-3xl md:text-4xl font-bold">Want a Custom Domain?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upgrade to Pro and get your own branded short links with advanced analytics and priority support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="btn-primary text-lg px-10 py-6" asChild>
              <a href="/pricing">View Pricing</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
              <a href="/about">Learn More</a>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
