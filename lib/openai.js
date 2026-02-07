// OpenAI Configuration
export const OPENAI_CONFIG = {
  apiKey: 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,
  model: 'gpt-4o-mini',
  baseURL: 'https://api.openai.com/v1'
};

export async function callOpenAI(messages, options = {}) {
  const response = await fetch(`${OPENAI_CONFIG.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`
    },
    body: JSON.stringify({
      model: options.model || OPENAI_CONFIG.model,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      stream: options.stream || false
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  return response.json();
}
