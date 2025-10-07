'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

export function AuthStatusHandler() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [previousUserId, setPreviousUserId] = useState<string | null>(null);

  useEffect(() => {
    // Show welcome toast when user successfully signs in
    if (isLoaded && user && !hasShownWelcome) {
      const userName = user.firstName || user.emailAddresses[0]?.emailAddress || 'there';
      
      toast({
        title: "Successfully logged in",
        description: `Welcome back, ${userName}`,
        duration: 4000,
        className: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-900 shadow-lg backdrop-blur-sm",
      });
      
      setHasShownWelcome(true);
      setPreviousUserId(user.id);
    }

    // Detect sign out
    if (isLoaded && !user && previousUserId) {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
        duration: 3000,
        className: "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 text-slate-700 shadow-lg backdrop-blur-sm",
      });
      
      setHasShownWelcome(false);
      setPreviousUserId(null);
    }
  }, [isLoaded, user, toast, hasShownWelcome, previousUserId]);

  return null;
}
