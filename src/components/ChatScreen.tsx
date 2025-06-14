import { useState } from 'react';
import styles from './ChatScreen.module.css';

type Message = {
  sender: string;
  text: string;
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('Chat');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: mode, text: input }]);
      setInput('');
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className={styles.chatScreen}>
      <div className={styles.header}>
        <h2>AI Chat</h2>
        <div className={styles.modeButtons}>
          <button onClick={() => setMode('Chat')} className={mode === 'Chat' ? styles.active : ''}>Chat</button>
          <button onClick={() => setMode('Agent')} className={mode === 'Agent' ? styles.active : ''}>Agent</button>
        </div>
        <button onClick={handleClear} className={styles.clearButton}>Clear Chat</button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'Chat' ? styles.chatMessage : styles.agentMessage}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;