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
  X,
  QrCode,
  Download,
  Brain,
  Lock
} from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { isValidUrl, copyToClipboard } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import QRCode from 'qrcode';
import QRCodeStyling from 'qr-code-styling';
import { WaitlistDialog } from '@/components/WaitlistDialog';

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
  const [includeQRCode, setIncludeQRCode] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrCodeStyle, setQrCodeStyle] = useState<string>('classic');
  const [aiGenerateShort, setAiGenerateShort] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Free');

  // For now, assume all users are on free tier (you can implement proper subscription checking later)
  const isFreeTier = !user; // Free tier if not logged in
  const isPaidTier = user; // Paid tier if logged in (simplified for now)

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

  // QR Code Style Configurations
  const getQRCodeConfig = (style: string, url: string) => {
    const baseConfig = {
      width: 320,
      height: 320,
      type: "canvas" as const,
      data: url,
      qrOptions: {
        errorCorrectionLevel: "M" as const
      }
    };

    switch (style) {
      case 'classic':
        return {
          ...baseConfig,
          dotsOptions: {
            color: "#ea580c",
            type: "square" as const
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            color: "#ea580c",
            type: "square" as const
          },
          cornersDotOptions: {
            color: "#ea580c",
            type: "square" as const
          }
        };

      case 'rounded':
        return {
          ...baseConfig,
          dotsOptions: {
            color: "#ea580c",
            type: "rounded" as const
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            color: "#ea580c",
            type: "extra-rounded" as const
          },
          cornersDotOptions: {
            color: "#ffffff",
            type: "dot" as const
          }
        };

      case 'gradient':
        return {
          ...baseConfig,
          dotsOptions: {
            type: "rounded" as const,
            gradient: {
              type: "linear" as const,
              rotation: 45,
              colorStops: [
                { offset: 0, color: "#f97316" },
                { offset: 1, color: "#ea580c" }
              ]
            }
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            type: "extra-rounded" as const,
            gradient: {
              type: "linear" as const,
              rotation: 0,
              colorStops: [
                { offset: 0, color: "#f97316" },
                { offset: 1, color: "#dc2626" }
              ]
            }
          },
          cornersDotOptions: {
            color: "#ffffff",
            type: "dot" as const
          }
        };

      case 'minimal':
        return {
          ...baseConfig,
          dotsOptions: {
            color: "#000000",
            type: "square" as const
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            color: "#000000",
            type: "square" as const
          },
          cornersDotOptions: {
            color: "#000000",
            type: "square" as const
          }
        };

      case 'dots':
        return {
          ...baseConfig,
          dotsOptions: {
            color: "#ea580c",
            type: "dots" as const
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            color: "#ea580c",
            type: "extra-rounded" as const
          },
          cornersDotOptions: {
            color: "#ea580c",
            type: "dot" as const
          }
        };

      default:
        return {
          ...baseConfig,
          dotsOptions: {
            color: "#ea580c",
            type: "square" as const
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          cornersSquareOptions: {
            color: "#ea580c",
            type: "square" as const
          },
          cornersDotOptions: {
            color: "#ea580c",
            type: "square" as const
          }
        };
    }
  };

  // Generate Modern QR Code function
  const generateQRCode = async (url: string) => {
    try {
      const qrCode = new QRCodeStyling(getQRCodeConfig(qrCodeStyle, url));

      // Create container for QR + label
      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
      if (!ctx) return '';

      finalCanvas.width = 320;
      finalCanvas.height = 400;

      // Draw gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 320, 400);
      bgGradient.addColorStop(0, '#ffffff');
      bgGradient.addColorStop(1, '#fef3f2');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 320, 400);

      // Generate QR code and wait for it
      return new Promise((resolve) => {
        qrCode.getRawData("png").then((buffer) => {
          if (buffer) {
            // Convert buffer to ArrayBuffer for Blob constructor
            let arrayBuffer: ArrayBuffer;
            if (buffer instanceof ArrayBuffer) {
              arrayBuffer = buffer;
            } else if (buffer instanceof Buffer) {
              const underlyingBuffer = buffer.buffer;
              if (underlyingBuffer instanceof ArrayBuffer) {
                arrayBuffer = underlyingBuffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
              } else {
                // Handle SharedArrayBuffer case
                arrayBuffer = new ArrayBuffer(buffer.byteLength);
                new Uint8Array(arrayBuffer).set(new Uint8Array(underlyingBuffer, buffer.byteOffset, buffer.byteLength));
              }
            } else if (buffer instanceof SharedArrayBuffer) {
              // Convert SharedArrayBuffer to ArrayBuffer
              arrayBuffer = new ArrayBuffer(buffer.byteLength);
              new Uint8Array(arrayBuffer).set(new Uint8Array(buffer));
            } else {
              // Handle other buffer types (Blob, etc.)
              arrayBuffer = new ArrayBuffer(0);
            }
            
            const blob = new Blob([arrayBuffer], { type: 'image/png' });
            const qrImage = document.createElement('img');
            qrImage.onload = () => {
              // Draw QR code
              ctx.drawImage(qrImage, 0, 0, 320, 320);

              // Add "ORANGEURL" label
              ctx.fillStyle = '#ea580c';
              ctx.font = 'bold 24px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
              ctx.textAlign = 'center';
              
              // Add text shadow
              ctx.shadowColor = 'rgba(234, 88, 12, 0.2)';
              ctx.shadowBlur = 4;
              ctx.shadowOffsetY = 2;
              
              ctx.fillText('ORANGEURL', 160, 370);

              // Reset shadow
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
              ctx.shadowOffsetY = 0;

              const dataUrl = finalCanvas.toDataURL('image/png', 0.95);
              setQrCodeDataUrl(dataUrl);
              resolve(dataUrl);
            };
            qrImage.src = URL.createObjectURL(blob);
          } else {
            resolve('');
          }
        }).catch(() => {
          resolve('');
        });
      });

    } catch (error) {
      console.error('Modern QR Code generation failed:', error);
      return '';
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

  // Handle waitlist events
  useEffect(() => {
    const handleOpenWaitlist = (event: CustomEvent) => {
      setSelectedPlan(event.detail.plan);
      setWaitlistOpen(true);
    };

    window.addEventListener('openWaitlist', handleOpenWaitlist as EventListener);
    return () => window.removeEventListener('openWaitlist', handleOpenWaitlist as EventListener);
  }, []);

  const handleShorten = async () => {
    if (!url) {
      setError('Please enter a URL');
        toast({
          title: "Error",
          description: "Please enter a URL",
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
        });
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
        toast({
          title: "Error",
          description: "Please enter a valid URL",
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
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
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
        });
      return;
    }

    setIsLoading(true);
    setError('');
    setQrCodeDataUrl(''); // Clear previous QR code

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
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
        });
        return;
      }

      if (data.error) {
        setError(data.error);
        toast({
          title: "Error", 
          description: data.error,
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
        });
      } else {
        const shortUrl = data.shortUrl || data.CustomShort || data.short;
        setShortUrl(shortUrl);
        setError('');
        
        // Generate QR code if toggle is enabled
        if (includeQRCode) {
          await generateQRCode(shortUrl);
        }
        
        // Clear custom short after successful creation
        setCustomShort('');
        setAvailability(null);
        toast({
          title: "Success!",
          description: customShort ? `Custom short created: ${customShort}` : "URL shortened successfully",
          className: "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300",
        });
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
        toast({
          title: "Network Error",
          description: errorMessage,
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
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
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard",
          className: "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 text-orange-900 dark:text-orange-100",
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

                  {/* Custom Short Input with AI Toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          placeholder="Custom short (optional) - e.g., 'my-link'"
                          value={customShort}
                          onChange={(e) => setCustomShort(e.target.value)}
                          className="h-10 flex-1"
                          disabled={isFreeTier}
                        />
                        {isFreeTier && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/60 to-gray-300/80 dark:from-transparent dark:via-gray-700/60 dark:to-gray-800/80 rounded-md pointer-events-none flex items-center justify-end pr-3">
                            <Lock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* AI Toggle Inline */}
                      <div 
                        className={`relative flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border border-border whitespace-nowrap ${isFreeTier ? 'cursor-pointer' : ''}`}
                        onClick={isFreeTier ? () => {
                          toast({
                            title: "Unlock AI Features",
                            description: "Upgrade to Pro to use AI-powered short URL generation",
                            className: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-900 shadow-lg backdrop-blur-sm",
                          });
                        } : undefined}
                      >
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">AI</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={aiGenerateShort}
                            onChange={(e) => setAiGenerateShort(e.target.checked)}
                            className="sr-only peer"
                            disabled={isFreeTier}
                          />
                          <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      {isCheckingAvailability && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                          Checking...
                        </div>
                      )}
                    </div>
                    
                    {/* AI Description */}
                    {aiGenerateShort && (
                      <div className="text-xs text-muted-foreground px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Brain className="w-3 h-3 inline mr-1" />
                        AI will create meaningful custom short URLs based on your content
                      </div>
                    )}
                    
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

                  {/* QR Code Toggle */}
                  <div 
                    className={`relative flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border ${isFreeTier ? 'cursor-pointer' : ''}`}
                    onClick={isFreeTier ? () => {
                      toast({
                        title: "Unlock QR Code Features",
                        description: "Upgrade to Pro to generate custom QR codes with branding",
                        className: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-900 shadow-lg backdrop-blur-sm",
                      });
                    } : undefined}
                  >
                    <QrCode className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Generate QR Code</div>
                      <div className="text-xs text-muted-foreground">Include a QR code with OrangeURL branding</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeQRCode}
                        onChange={(e) => setIncludeQRCode(e.target.checked)}
                        className="sr-only peer"
                        disabled={isFreeTier}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* QR Code Style Selector */}
                  {includeQRCode && (
                    <div className="space-y-3 p-3 bg-muted/20 rounded-lg border border-border">
                      <div className="font-medium text-sm text-foreground">Choose QR Code Style</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                 {[
                           { id: 'classic', name: 'Classic', desc: 'Clean squares' },
                           { id: 'minimal', name: 'Minimal', desc: 'Black & white' },
                           { id: 'dots', name: 'Dotted', desc: 'Circular dots' }
                         ].map((style) => (
                          <label
                            key={style.id}
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:bg-muted/50 ${
                              qrCodeStyle === style.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-background'
                            }`}
                          >
                            <input
                              type="radio"
                              name="qrStyle"
                              value={style.id}
                              checked={qrCodeStyle === style.id}
                              onChange={(e) => setQrCodeStyle(e.target.value)}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="font-medium text-sm">{style.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{style.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
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
                      className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-600"
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

                {/* QR Code Display */}
                {qrCodeDataUrl && shortUrl && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 p-6 bg-muted/30 rounded-lg border border-border"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg">QR Code Generated</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan to visit your shortened link
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code for shortened URL"
                        className="w-64 h-auto"
                      />
                    </div>

                    <Button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.download = `orangeurl-qr-${Date.now()}.png`;
                        link.href = qrCodeDataUrl;
                        link.click();
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download QR Code
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4 space-y-2">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800">
              <Sparkles className="w-3 h-3 mr-1" />
              <span>Trial phase, Links expire in 24 hours - </span>
              <button 
                onClick={() => {
                  const event = new CustomEvent('openWaitlist', { detail: { plan: 'Free' } });
                  window.dispatchEvent(event);
                }}
                className="underline hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
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
                <Button 
                  className="btn-primary"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
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
              title: "Custom QR Codes",
              description: "Generate branded QR codes with custom colors and your logo",
              icon: <QrCode className="w-8 h-8" />,
              gradient: "from-orange-600 to-amber-600",
              features: ["Custom styling", "Brand colors", "Logo integration"]
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

      {/* Waitlist Dialog */}
      <WaitlistDialog 
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
}
