'use client';

import { useState } from 'react';

export default function PitchAnalyzer({ startupData }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/analyze-pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(startupData)
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze pitch. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        style={{
          background: analyzing ? '#ccc' : '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: analyzing ? 'not-allowed' : 'pointer'
        }}
      >
        {analyzing ? '🤖 Analyzing...' : '🤖 Analyze My Pitch'}
      </button>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {analysis && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px'
        }}>
          {analysis.score && (
            <div style={{ fontSize: '48px', textAlign: 'center', color: '#4CAF50' }}>
              {analysis.score}/100
            </div>
          )}
          <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis.analysis}</pre>
        </div>
      )}
    </div>
  );
}
