'use client';

import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. Ask me anything about startups, investors, or this platform! 👋'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: '#4CAF50',
          border: 'none',
          borderRadius: '50%',
          fontSize: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s'
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000
        }}>
          <div style={{
            background: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '15px 15px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>🤖 AI Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            background: '#f5f5f5'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  background: msg.role === 'user' ? '#4CAF50' : 'white',
                  color: msg.role === 'user' ? 'white' : '#333',
                  wordWrap: 'break-word'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div style={{ padding: '10px', background: 'white', borderRadius: '15px', display: 'inline-block' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#999', borderRadius: '50%', margin: '0 2px' }}></span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#999', borderRadius: '50%', margin: '0 2px' }}></span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#999', borderRadius: '50%', margin: '0 2px' }}></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            display: 'flex',
            padding: '15px',
            borderTop: '1px solid #ddd',
            background: 'white',
            borderRadius: '0 0 15px 15px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none'
              }}
            />
            <button 
              onClick={sendMessage} 
              disabled={loading}
              style={{
                marginLeft: '10px',
                padding: '10px 20px',
                background: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
