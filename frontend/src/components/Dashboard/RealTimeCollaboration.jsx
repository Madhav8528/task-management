import React, { useState } from 'react';
import './Dashboard.css';

const RealTimeCollaboration = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hey team!' },
    { id: 2, user: 'Bob', text: 'Working on the new feature.' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'You', text: inputValue }]);
    setInputValue('');
  };

  return (
    <div className="dashboard-section">
      <h2>Real-Time Collaboration</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.user === 'You' ? 'my-message' : ''}`}
            >
              <strong>{msg.user}: </strong> {msg.text}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="dashboard-btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;
