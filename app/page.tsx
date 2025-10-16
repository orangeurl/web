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
  Lock,
  Copy,
  Crown,
  Instagram,
  Twitter,
  ShoppingBag,
  FileText,
  Youtube
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

    console.log('Frontend: Checking availability for:', customShortValue.trim());
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
      console.log('Frontend: Availability result:', data);
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

      // Generate QR code
      const buffer = await qrCode.getRawData("png");
      if (!buffer) return '';

      // Convert buffer to ArrayBuffer
      let arrayBuffer: ArrayBuffer;
      if (buffer instanceof ArrayBuffer) {
        arrayBuffer = buffer;
      } else if (buffer instanceof Buffer) {
        const underlyingBuffer = buffer.buffer;
        if (underlyingBuffer instanceof ArrayBuffer) {
          arrayBuffer = underlyingBuffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        } else {
          arrayBuffer = new ArrayBuffer(buffer.byteLength);
          new Uint8Array(arrayBuffer).set(new Uint8Array(underlyingBuffer, buffer.byteOffset, buffer.byteLength));
        }
      } else if (buffer instanceof Blob) {
        arrayBuffer = await buffer.arrayBuffer();
      } else {
        const bufferLength = (buffer as any).byteLength || (buffer as any).length || 0;
        arrayBuffer = new ArrayBuffer(bufferLength);
        if (bufferLength > 0) {
          new Uint8Array(arrayBuffer).set(new Uint8Array(buffer as any));
        }
      }

      // Create image from buffer
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      const qrImage = document.createElement('img');
      
      return new Promise((resolve) => {
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
        
        qrImage.onerror = () => resolve('');
        qrImage.src = URL.createObjectURL(blob);
      });

    } catch (error) {
      console.error('QR Code generation failed:', error);
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
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
        toast({
          title: "Error",
          description: "Please enter a valid URL",
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
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
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
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
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
        return;
      }

      if (data.error) {
        setError(data.error);
        toast({
          title: "Error", 
          description: data.error,
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
      } else {
        const shortUrl = data.shortUrl || data.CustomShort || data.short;
        setShortUrl(shortUrl);
        setError('');
        
        // Generate QR code if toggle is enabled
        if (includeQRCode) {
          await generateQRCode(shortUrl);
        }
        
        // Clear custom short and availability state after successful creation
        setCustomShort('');
        setAvailability(null);
        toast({
          title: "Success!",
          description: customShort ? `Custom short created: ${customShort}` : "URL shortened successfully",
          className: "border-2 border-primary/30 bg-primary/10 text-primary shadow-lg",
        });
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
        toast({
          title: "Network Error",
          description: errorMessage,
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
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
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard",
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
      }
    }
  }, [shortUrl, copied, toast]);

  const handleCopyQRCode = useCallback(async () => {
    if (qrCodeDataUrl) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrCodeDataUrl);
        const blob = await response.blob();
        
        // Copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        
        toast({
          title: "QR Code copied!",
          description: "QR code image copied to clipboard",
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Failed to copy QR code to clipboard",
          className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
        });
      }
    }
  }, [qrCodeDataUrl, toast]);

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
        className="text-center space-y-12 py-8 relative"
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
              URL Shortener + Bio Pages
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
              Build Your Bio
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Create short, memorable links and beautiful bio pages. Perfect for creators, brands, and businesses. All-in-one link management solution.
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
                      <div 
                        className="relative flex-1"
                        onClick={isFreeTier ? () => {
                          toast({
                            title: "Unlock Custom Short Links",
                            description: "Upgrade to Pro to create custom branded short URLs",
                            className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
                          });
                        } : undefined}
                      >
                        <Input
                          type="text"
                          placeholder="Custom short (optional) - e.g., 'my-link'"
                          value={customShort}
                          onChange={(e) => setCustomShort(e.target.value)}
                          className="h-10 flex-1"
                          disabled={isFreeTier}
                        />
                        {isFreeTier && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/60 to-gray-300/80 dark:from-transparent dark:via-gray-700/60 dark:to-gray-800/80 rounded-md cursor-pointer flex items-center justify-end pr-3 gap-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Get Pro to unlock</span>
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
                            className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
                          });
                        } : undefined}
                      >
                        {isFreeTier && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/60 to-gray-300/80 dark:from-transparent dark:via-gray-700/60 dark:to-gray-800/80 rounded-lg pointer-events-none" />
                        )}
                        <Brain className="w-4 h-4 text-primary relative z-10" />
                        <span className="text-sm font-medium relative z-10">AI</span>
                        <label className="relative inline-flex items-center cursor-pointer z-10">
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
                         className: "border-2 border-primary/20 bg-card text-card-foreground shadow-lg",
                       });
                     } : undefined}
                   >
                     {isFreeTier && (
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/60 to-gray-300/80 dark:from-transparent dark:via-gray-700/60 dark:to-gray-800/80 rounded-lg pointer-events-none" />
                     )}
                     <QrCode className="w-5 h-5 text-primary relative z-10" />
                     <div className="flex-1 relative z-10">
                      <div className="font-medium text-sm">Generate QR Code</div>
                      <div className="text-xs text-muted-foreground">Include a QR code with OrangeURL branding</div>
                    </div>
                     <label className="relative inline-flex items-center cursor-pointer z-10">
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

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleCopyQRCode}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy QR Code
                      </Button>
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
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4 space-y-2">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-xs font-medium border border-orange-200 dark:border-orange-800">
              <Sparkles className="w-3 h-3 mr-1" />
              <span>Trial phase login to get pro for free, Links expire in 24 hours - </span>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-20"
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

      {/* Bio Page Templates Showcase */}
      <motion.section 
        className="space-y-16 py-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center space-y-5 md:space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-800/50 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            Beautiful Bio Pages
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Create Your <span className="gradient-text-primary">Perfect Bio Page</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from stunning templates designed for creators, influencers, and brands. Showcase your products or build your link hub.
          </p>
        </motion.div>

        {/* Template Showcase Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4"
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
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeInUp} className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Build your perfect bio page in minutes
                </p>
                <Button 
            className="btn-primary text-lg px-8 py-6"
            onClick={() => window.location.href = '/bio'}
                >
            Explore Bio Pages
            <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Supercharge Your Links?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upgrade to Pro and unlock powerful features like custom short URLs, advanced analytics, QR codes, and priority support.
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
