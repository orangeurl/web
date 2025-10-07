import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode'); // 'signup' or 'signin'

  console.log(`🔄 Auth callback triggered - Mode: ${mode}, User ID: ${userId}`);

  if (userId && mode) {
    // Configure webhook mode based on the authentication flow
    const webhookUrl = `${process.env.BACKEND_API_URL || 'https://api.orangeurl.live'}/api/webhooks/clerk?mode=${mode}`;
    
    console.log(`📡 Webhook will be called with mode: ${mode}`);
    console.log(`🔗 Webhook URL: ${webhookUrl}`);
    
    // Store the mode in a way that Clerk webhooks can access it
    // This could be done via session storage, cookies, or database
    // For now, we'll rely on the URL parameter in the webhook configuration
  }

  // Redirect to dashboard after successful authentication
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

export async function POST(request: NextRequest) {
  return GET(request);
}
