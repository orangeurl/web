'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Clock
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
            Manage your short links, track analytics, and grow your online presence
          </p>
        </motion.div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {[
          { 
            title: "Total Links", 
            value: "12", 
            change: "+2 this week",
            icon: <LinkIcon className="w-6 h-6" />,
            color: "from-orange-500 to-red-500"
          },
          { 
            title: "Total Clicks", 
            value: "1,234", 
            change: "+15% this month",
            icon: <Eye className="w-6 h-6" />,
            color: "from-green-500 to-emerald-500"
          },
          { 
            title: "This Month", 
            value: "456", 
            change: "+8% vs last month",
            icon: <Calendar className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500"
          },
          { 
            title: "Top Performer", 
            value: "87%", 
            change: "Click-through rate",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "from-purple-500 to-pink-500"
          }
        ].map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Recent Links */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Links</h2>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  short: "orangeurl.live/abc123", 
                  original: "https://example.com/very-long-url-that-needs-shortening",
                  clicks: 234,
                  date: "2 days ago"
                },
                { 
                  short: "orangeurl.live/def456", 
                  original: "https://another-example.com/another-long-url",
                  clicks: 156,
                  date: "5 days ago"
                },
                { 
                  short: "orangeurl.live/ghi789", 
                  original: "https://third-example.com/yet-another-url",
                  clicks: 89,
                  date: "1 week ago"
                }
              ].map((link, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <p className="font-medium text-primary">{link.short}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{link.original}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {link.clicks} clicks
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {link.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Analytics Overview</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Click Rate</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Mobile Traffic</span>
                    <span className="text-sm text-muted-foreground">64%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '64%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-sm text-muted-foreground">23%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '23%'}}></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Top Locations</h3>
                  <div className="space-y-2">
                    {[
                      { country: "United States", percentage: 45 },
                      { country: "United Kingdom", percentage: 23 },
                      { country: "Canada", percentage: 18 },
                      { country: "Australia", percentage: 14 }
                    ].map((location, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{location.country}</span>
                        <span className="text-muted-foreground">{location.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </div>
  );
}
