'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

export function AuthStatusHandler() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Show welcome toast when user successfully signs in
    if (isLoaded && user && !hasShownWelcome) {
      const userName = user.firstName || user.emailAddresses[0]?.emailAddress || 'there';
      
      toast({
        title: "✅ Successfully logged in!",
        description: `Welcome back, ${userName}!`,
        duration: 5000,
      });
      
      setHasShownWelcome(true);
    }
  }, [isLoaded, user, toast, hasShownWelcome]);

  return null; // This component doesn't render anything
}
