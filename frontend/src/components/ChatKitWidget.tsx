import React, { useState, useEffect } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ChatKitWidget: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { chatKitUrl, chatKitDomainKey } = siteConfig.customFields as { chatKitUrl: string; chatKitDomainKey: string };

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
      url: chatKitUrl,
      domainKey: chatKitDomainKey,
    },
    initialThread: initialThread ?? undefined,
    theme: {
      colorScheme: 'dark',
      radius: 'pill',
      density: 'spacious',
      color: {
        grayscale: {
          hue: 29,
          tint: 9,
          shade: 4
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
      greeting: 'Protocol Initiated. How can I assist?',
      prompts: [
        {
          label: 'System Status',
          prompt: 'What is the status of the ChatKit system?'
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
      placeholder: 'Enter Command...',
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
            background: 'rgba(203, 125, 16, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #cb7d10',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(203, 125, 16, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 100
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(203, 125, 16, 0.8)';
            e.currentTarget.style.background = 'rgba(203, 125, 16, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(203, 125, 16, 0.4)';
            e.currentTarget.style.background = 'rgba(203, 125, 16, 0.2)';
          }}
          aria-label="Open Chat"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cb7d10" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 5px #cb7d10)' }}>
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
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(2px)',
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
            background: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(203, 125, 16, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            animation: 'popupIn 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            {/* Chat Content */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <ChatKit control={control} className="chatkit-full" />
            </div>
          </div>

           <style>{`
            @keyframes popupIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(20px);
                filter: blur(10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0px);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default ChatKitWidget;
