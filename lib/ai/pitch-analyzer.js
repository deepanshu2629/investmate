import { callOpenAI } from './openai';

export async function analyzePitch(pitchData) {
  const prompt = `Analyze this startup pitch and provide detailed feedback:

Company: ${pitchData.companyName || 'N/A'}
Industry: ${pitchData.industry || 'N/A'}
Description: ${pitchData.description || 'N/A'}
Problem Statement: ${pitchData.problemStatement || 'N/A'}
Solution: ${pitchData.solution || 'N/A'}
Target Market: ${pitchData.targetMarket || 'N/A'}
Business Model: ${pitchData.businessModel || 'N/A'}
Competitive Advantage: ${pitchData.competitiveAdvantage || 'N/A'}
Funding Stage: ${pitchData.fundingStage || 'N/A'}

Please provide:
1. Overall Score (0-100) with brief explanation
2. Key Strengths (3-5 bullet points)
3. Areas for Improvement (3-5 bullet points)
4. Actionable Recommendations (3-5 specific suggestions)
5. Investment Readiness Assessment

Format the response clearly with sections.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert startup pitch analyzer and venture capital advisor. Provide constructive, detailed, and actionable feedback.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  try {
    const response = await callOpenAI(messages, {
      maxTokens: 1500,
      temperature: 0.7
    });

    const analysis = response.choices[0].message.content;

    const scoreMatch = analysis.match(/(\d+)\/100|Score.*?(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2]) : null;

    return {
      success: true,
      score,
      analysis,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Pitch analysis error:', error);
    throw new Error('Failed to analyze pitch');
  }
}
