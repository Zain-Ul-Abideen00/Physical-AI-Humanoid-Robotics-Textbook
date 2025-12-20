import React, { useState, useEffect } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';

const ChatKitWidget: React.FC = () => {
  const [initialThread, setInitialThread] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Load saved thread ID on mount
  useEffect(() => {
    const savedThread = localStorage.getItem('chatkit_thread_id');
    if (savedThread) setInitialThread(savedThread);
    setIsReady(true);
  }, []);

  const { control } = useChatKit({
    api: {
      url: 'https://humanoid-robotics.up.railway.app/chatkit',
      domainKey: 'zain-humanoid-robotics.vercel.app',
    },
    initialThread: initialThread ?? undefined,
    theme: {
      colorScheme: 'light',
      radius: 'pill',
      density: 'spacious',
      color: {
        grayscale: {
          hue: 36,
          tint: 9,
          shade: 3
        },
        accent: {
          primary: '#cb7d10',
          level: 2
        }
      },
      typography: {
        baseSize: 16,
        fontFamily: '\'JetBrains Mono\', monospace',
        fontFamilyMono: '\'JetBrains Mono\', monospace',
        fontSources: [
          {
            family: 'JetBrains Mono',
            style: 'normal',
            weight: 300,
            display: 'swap',
            src: 'https://fonts.gstatic.com/s/jetbrainsmono/v23/tDbV2o-flEEny0FZhsfKu5WU4xD1OwGtT0rU3BE.woff2',
            unicodeRange: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF'
          }
        ]
      }
    },
    startScreen: {
      greeting: 'Welcome to Humanoid Robotics Textbook',
      prompts: [
        {
          label: 'What is ChatKit?',
          prompt: 'What is ChatKit?'
        },
        {
          label: 'Components',
          prompt: 'What are the key components of a humanoid robot?'
        },
        {
          label: 'Actuators',
          prompt: 'Explain the difference between actuators and sensors.'
        }
      ],
    },
    composer: {
      placeholder: 'Ask me anything about textbook',
      attachments: {
        enabled: false
      },
      tools: [],
    },
    onThreadChange: ({ threadId }) => {
      if (threadId) {
        localStorage.setItem('chatkit_thread_id', threadId);
      }
    },
  });

  if (!isReady) return null;

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#cb7d10',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(203, 125, 16, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
            zIndex: 100
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Open Chat"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <>
          {/* Backdrop (Click to close) */}
          <div
            onClick={() => setIsChatOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.2)',
              zIndex: 999,
              pointerEvents: 'auto'
            }}
          />

          {/* Popup Window */}
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '420px',
            height: '600px',
            maxWidth: 'calc(100vw - 4rem)',
            maxHeight: 'calc(100vh - 4rem)',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            animation: 'popupIn 0.25s ease-out',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            {/* Header Removed as per user request */}

            {/* Chat Content */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <ChatKit control={control} className="chatkit-full" />
            </div>
          </div>

           <style>{`
            @keyframes popupIn {
              from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default ChatKitWidget;
