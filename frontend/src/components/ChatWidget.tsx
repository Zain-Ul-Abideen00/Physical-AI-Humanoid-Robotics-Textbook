import React, { useState, useEffect, useRef } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ChatWidget Component (Custom Implementation)
 * Provides a global chat interface with "Launcher" bubble and a custom Chat Window.
 * Connects to the backend RAG agent via SSE.
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persistence (Session Storage)
  useEffect(() => {
    const savedState = sessionStorage.getItem('chat_is_open');
    if (savedState) setIsOpen(JSON.parse(savedState));

    const savedMessages = sessionStorage.getItem('chat_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chat_is_open', JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    sessionStorage.setItem('chat_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('https://humanoid-robotics.up.railway.app/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';

      // Add empty assistant message to start streaming into
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.type === 'content' && data.delta) {
                assistantMsg += data.delta;
                setMessages(prev => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last.role === 'assistant') {
                    last.content = assistantMsg;
                  }
                  return updated;
                });
              }
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
          }
        }
      }
    } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the agent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: 'var(--chat-widget-bottom, 20px)',
          right: 'var(--chat-widget-right, 20px)',
          width: 'var(--chat-bubble-size, 60px)',
          height: 'var(--chat-bubble-size, 60px)',
          borderRadius: '50%',
          backgroundColor: 'var(--chat-widget-primary, #2e8555)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 'var(--chat-widget-z-index, 1000)',
        }}
        aria-label="Toggle Chat"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComment size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(var(--chat-widget-bottom, 20px) + var(--chat-bubble-size, 60px) + 20px)',
            right: 'var(--chat-widget-right, 20px)',
            width: '380px',
            height: '600px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: 'var(--ifm-background-color)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 'var(--chat-widget-z-index, 1000)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--ifm-color-emphasis-200)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--chat-widget-primary, #2e8555)',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Robotics Assistant
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-600)', marginTop: '40px' }}>
                    👋 Hi! Ask me anything about the textbook.
                </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? 'var(--chat-widget-primary, #2e8555)' : 'var(--ifm-color-emphasis-200)',
                  color: msg.role === 'user' ? 'white' : 'var(--ifm-color-content)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  lineHeight: '1.4'
                }}
              >
                {msg.role === 'assistant' ? (
                     <div className="markdown-body">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                     </div>
                ) : (
                    msg.content
                )}
              </div>
            ))}
            {isLoading && !messages[messages.length-1]?.content && (
                <div style={{ alignSelf: 'flex-start', color: 'var(--ifm-color-emphasis-500)', fontSize: '0.8rem' }}>
                    Thinking...
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            style={{
                padding: '12px',
                borderTop: '1px solid var(--ifm-color-emphasis-200)',
                display: 'flex',
                gap: '8px'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '20px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)',
                color: 'var(--ifm-color-content)',
                outline: 'none'
              }}
            />
            <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--chat-widget-primary, #2e8555)',
                    cursor: (isLoading || !inputValue.trim()) ? 'default' : 'pointer',
                    opacity: (isLoading || !inputValue.trim()) ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <FaPaperPlane size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
