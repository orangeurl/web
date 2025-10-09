import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://api.orangeurl.live';

export async function POST(request: NextRequest) {
  try {
    const { customShort } = await request.json();
    
    if (!customShort) {
      return NextResponse.json(
        { error: 'Custom short is required' },
        { status: 400 }
      );
    }

    // Use the dedicated availability check endpoint
    const checkUrl = `${BACKEND_URL}/api/v1/check-availability`;
    
    console.log('Backend: Checking availability at:', checkUrl, 'for:', customShort);
    
    const response = await fetch(checkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customShort: customShort.trim() }),
    });
    
    const data = await response.json();
    console.log('Backend: Availability response:', data);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to check availability' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ 
      available: data.available, 
      message: data.message 
    });
    
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { 
        available: true, 
        message: 'Unable to check availability, but you can try this short URL' 
      },
      { status: 200 } // Return 200 to not break the UI
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 