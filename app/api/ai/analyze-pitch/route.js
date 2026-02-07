 
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const pitchData = await request.json();

    if (!pitchData.companyName || !pitchData.description) {
      return NextResponse.json(
        { error: 'Company name and description are required' },
        { status: 400 }
      );
    }

    // OpenAI API call
    const prompt = `Analyze this startup pitch and provide detailed feedback:

Company: ${pitchData.companyName || 'N/A'}
Industry: ${pitchData.industry || 'N/A'}
Description: ${pitchData.description || 'N/A'}
Problem: ${pitchData.problemStatement || 'N/A'}
Solution: ${pitchData.solution || 'N/A'}
Target Market: ${pitchData.targetMarket || 'N/A'}
Business Model: ${pitchData.businessModel || 'N/A'}
Competitive Advantage: ${pitchData.competitiveAdvantage || 'N/A'}

Provide:
1. Overall Score (0-100)
2. Key Strengths (3-5 points)
3. Areas for Improvement (3-5 points)
4. Actionable Recommendations (3-5 points)
5. Investment Readiness Assessment

Format clearly with sections.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${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,
}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup pitch analyzer. Provide constructive, detailed feedback.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    const scoreMatch = analysis.match(/(\d+)\/100|Score.*?(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2]) : null;

    return NextResponse.json({
      success: true,
      score,
      analysis,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Analyze pitch API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze pitch' },
      { status: 500 }
    );
  }
}
