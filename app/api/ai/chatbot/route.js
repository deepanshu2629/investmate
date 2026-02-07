import { NextResponse } from 'next/server';
import { getChatbotResponse } from '@/lib/ai/chatbot';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const result = await getChatbotResponse(message, history || []);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
