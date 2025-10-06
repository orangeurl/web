'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RegistrationGuard } from '@/components/RegistrationGuard';
import { 
  Link as LinkIcon, 
  BarChart3, 
  Eye, 
  Calendar,
  Globe,
  Copy,
  Trash2,
  Plus,
  TrendingUp,
  Users,
  Clock,
  Lock
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

export default function DashboardPage() {
  return (
    <div className="space-y-8 py-8">
      <SignedOut>
        {/* Header */}
        <motion.section 
          className="text-center space-y-4"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold">
              Your <span className="gradient-text-primary">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Login to save your short links and view detailed analytics
            </p>
          </motion.div>
        </motion.section>

        {/* Login Prompt */}
        <motion.section 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="card-hover border-2 border-primary/20 bg-orange-100/30 dark:bg-orange-800/15 backdrop-blur-sm">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Lock className="w-10 h-10" />
              </div>
              
              <h2 className="text-2xl font-bold">Login Required</h2>
              <p className="text-muted-foreground">
                Please login to access your dashboard and manage your short links
              </p>
              
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <Button className="btn-primary px-8 py-3">
                    Login to Dashboard
                  </Button>
                </SignInButton>
                <p className="text-sm text-muted-foreground">
                  Don't have an account? 
                  <SignInButton mode="modal">
                    <span className="text-primary font-medium cursor-pointer hover:underline ml-1">
                      Sign up here
                    </span>
                  </SignInButton>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Features Preview */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { 
              title: "Save Links", 
              description: "Save your shortened URLs for easy access",
              icon: <LinkIcon className="w-8 h-8" />,
              color: "from-orange-500 to-red-500"
            },
            { 
              title: "View Analytics", 
              description: "Track clicks, locations, and user behavior",
              icon: <BarChart3 className="w-8 h-8" />,
              color: "from-green-500 to-emerald-500"
            },
            { 
              title: "Manage Links", 
              description: "Edit, delete, and organize your links",
              icon: <Globe className="w-8 h-8" />,
              color: "from-blue-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="card-hover border-2 hover:border-primary/20 bg-orange-100/30 dark:bg-orange-800/15 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>
      </SignedOut>

      <SignedIn>
        <RegistrationGuard>
          {/* Logged in dashboard content */}
          <motion.section 
            className="text-center space-y-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold">
                Your <span className="gradient-text-primary">Dashboard</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Manage your short links, track analytics, and grow your online presence
              </p>
            </motion.div>
          </motion.section>
          
          {/* Dashboard content */}
          <div className="text-center py-12">
            <p className="text-muted-foreground">Dashboard content will appear here when logged in and registered</p>
          </div>
        </RegistrationGuard>
      </SignedIn>
    </div>
  );
}
