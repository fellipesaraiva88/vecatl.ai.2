'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatAssistant() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage], mode: 'Assistant' }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.result }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      backgroundColor: '#0d0d0d',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>🤖 AI Assistant</h2>
        <button
          onClick={clearChat}
          style={{
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🗑 Clear
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: '#111',
        borderRadius: '10px',
        border: '1px solid #222',
        marginBottom: '10px'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <div style={{
              background: msg.role === 'user' ? '#007bff' : '#333',
              color: 'white',
              padding: '10px 14px',
              borderRadius: '16px',
              maxWidth: '70%',
              wordWrap: 'break-word'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: '#888', padding: '10px' }}>
            Generating...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #333',
            backgroundColor: '#1a1a1a',
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '12px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        marginTop: '12px',
        color: '#888'
      }}>
        Powered by: DeepSeek R1 via OpenRouter
      </div>
    </div>
  );
}
