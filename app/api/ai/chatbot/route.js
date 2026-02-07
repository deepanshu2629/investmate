import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for Investo, a platform connecting startups with investors. Help users with questions about startups, funding, and the platform. Be friendly and concise.`;

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      ...(history || []),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${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,
}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: data.choices[0].message.content,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
