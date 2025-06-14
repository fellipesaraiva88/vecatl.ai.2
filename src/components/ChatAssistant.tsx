'use client';

import React, { useState, useRef, useEffect } from 'react';
import './DialogStyles.module.css';

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

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], mode: 'Assistant' }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.result }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: '❌ Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const quickPrompts = [
    "Help me clarify the task",
    "Let's update details for 'hi'",
    "Start working on Freelancing project",
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#0d0d0d',
      color: 'white',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    }}>
      {/* Empty Prompt UI */}
      {messages.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}>
          <img src="/logo.svg" alt="logo" style={{ width: 48 }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>What can I help with?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: '1px solid #333',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  minWidth: '320px',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                // Optionally add animation here if using a library like framer-motion
              }}
            >
              <div style={{
                background: msg.role === 'user' ? '#007bff' : '#1f1f1f',
                padding: '12px 16px',
                borderRadius: '16px',
                maxWidth: '70%',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: '#888', fontStyle: 'italic' }}>Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Section */}
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '16px',
        marginTop: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <input
            type="text"
            value={input}
            placeholder="Message Vectal..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '10px',
              border: '1px solid #444',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '12px 18px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ↑
          </button>
        </div>

        {/* Footer Label */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#777',
          marginTop: '8px',
        }}>
          <span>DeepSeek: R1-0528</span>
          <span>🧠 Chat</span>
        </div>
      </div>
    </div>
  );
}
