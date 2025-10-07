'use client';

import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

export function AuthStatusHandler() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken();
        if (!token) return;

        const response = await fetch('/api/user/check-registration', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 403 && data.code === 'USER_NOT_REGISTERED') {
          // User is signed in with Clerk but not registered in our backend
          toast({
            title: "⚠️ Registration Required",
            description: "You're signed in but not fully registered. Please complete the sign-up process.",
            variant: "destructive",
            duration: 8000,
          });
        } else if (!response.ok) {
          // Other errors
          toast({
            title: "❌ Registration Check Failed",
            description: data.message || "Unable to verify your registration status.",
            variant: "destructive",
            duration: 5000,
          });
        }
        // If response is ok (200), user is fully registered - no toast needed
      } catch (error) {
        console.error('Registration check error:', error);
        toast({
          title: "🔄 Connection Error",
          description: "Unable to check registration status. Please try refreshing the page.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    // Check registration status when user loads
    if (isLoaded && user) {
      checkRegistrationStatus();
    }
  }, [isLoaded, user, getToken, toast]);

  return null; // This component doesn't render anything
}
