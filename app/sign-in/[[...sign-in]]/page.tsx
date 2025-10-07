'use client';

import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    // Configure Clerk to use sign-in webhook mode
    if (typeof window !== 'undefined') {
      // Set a flag to indicate this is sign-in mode
      sessionStorage.setItem('clerk_mode', 'signin');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text-primary">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your OrangeURL account
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
              card: 'shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
              formFieldInput: 'border border-gray-300 focus:border-orange-500 focus:ring-orange-500',
              footerActionLink: 'text-orange-600 hover:text-orange-700'
            }
          }}
          redirectUrl="/api/auth/callback?mode=signin"
        />
      </div>
    </div>
  );
}
