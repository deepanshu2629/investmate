import { callOpenAI } from './openai';

const SYSTEM_PROMPT = `You are an AI assistant for Investo, a platform that connects startups with investors. 

Your role:
- Help users understand the platform features
- Answer questions about startups, funding, and investors
- Provide guidance on creating profiles and making connections
- Offer insights about the startup ecosystem

Be friendly, professional, and concise. Keep responses under 150 words unless detailed explanation is requested.`;

export async function getChatbotResponse(userMessage, conversationHistory = []) {
  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage
    }
  ];

  try {
    const response = await callOpenAI(messages, {
      maxTokens: 500,
      temperature: 0.7
    });

    return {
      success: true,
      message: response.choices[0].message.content,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Chatbot error:', error);
    throw new Error('Failed to get chatbot response');
  }
}
