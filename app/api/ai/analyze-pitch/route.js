import { NextResponse } from 'next/server';
import { analyzePitch } from '@/lib/ai/pitch-analyzer';

export async function POST(request) {
  try {
    const pitchData = await request.json();

    if (!pitchData.companyName || !pitchData.description) {
      return NextResponse.json(
        { error: 'Company name and description are required' },
        { status: 400 }
      );
    }

    const result = await analyzePitch(pitchData);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analyze pitch API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze pitch' },
      { status: 500 }
    );
  }
}
