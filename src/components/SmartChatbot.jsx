import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Landmark, ShieldCheck } from 'lucide-react';
import { sanitizeString } from '../utils/security';

export default function SmartChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to ZM Concierge. How may we assist your architectural commission today?' }
  ]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Sanitize user inputs immediately to prevent SSTI/XSS/NoSQL injections
    const cleanInput = sanitizeString(input);
    const newMessages = [...messages, { sender: 'user', text: cleanInput }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Our concierge coordinates will contact you. For immediate calculations, try our dynamic Cost and ROI estimators on the Services page.";
      
      const query = cleanInput.toLowerCase();
      if (query.includes('cost') || query.includes('estimate') || query.includes('price')) {
        botResponse = "You can calculate standard budgets instantly using our cost matrix. Would you like to navigate to our Services estimator?";
      } else if (query.includes('sustain') || query.includes('carbon') || query.includes('green') || query.includes('leed')) {
        botResponse = "ZM projects meet LEED Gold and Platinum parameters. We inject CO2 during cement mixing to reduce carbon metrics by up to 30%.";
      } else if (query.includes('audit') || query.includes('book') || query.includes('schedule')) {
        botResponse = "To book a site feasibility audit, use the scheduler on our Contact page or click 'Begin Your Commission'.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Toggle button */}
      <button 
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Concierge Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <Landmark size={18} style={{ color: 'var(--accent-bronze)' }} />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block' }}>ZM CONCIERGE</span>
              <span style={{ fontSize: '0.6rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="portal-status-dot" style={{ width: '6px', height: '6px' }} /> Active Secure Link
              </span>
            </div>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className="chat-message-bubble"
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'var(--accent-bronze)' : 'rgba(255,255,255,0.03)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Quick options */}
          <div style={{ padding: '0.5rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => onNavigate('services')}
              style={{ fontSize: '0.65rem', padding: '4px 8px', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--accent-gold)' }}
            >
              Calculate Budget
            </button>
            <button 
              onClick={() => {
                setIsOpen(false);
                onNavigate('contact');
              }}
              style={{ fontSize: '0.65rem', padding: '4px 8px', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--accent-gold)' }}
            >
              Book Site Audit
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid var(--border-color)', padding: '0.5rem' }}>
            <input
              type="text"
              placeholder="Ask concierge..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={100}
              style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-primary)' }}
            />
            <button 
              type="submit"
              style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-bronze)' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
