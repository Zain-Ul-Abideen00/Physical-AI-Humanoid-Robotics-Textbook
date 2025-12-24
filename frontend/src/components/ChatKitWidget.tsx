import React, { useState, useEffect } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useSession } from '../lib/auth-client-factory';

// Inner component that handles a specific chat session
// By keying this component, we ensure useChatKit is completely reset when the user changes
const ChatKitSession: React.FC<{
  storageKey: string;
  config: { url: string; domainKey: string };
  token?: string;
}> = ({ storageKey, config, token }) => {
  // Always initialize with a thread ID from storage if available, otherwise null (New Thread)
  const [initialThread] = useState<string | null>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {

      return saved;
    }

    return null;
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  // Define custom fetch to inject Authorization header
  // ChatKit generic types for fetch are compatible with window.fetch
  const customFetch: typeof fetch = React.useCallback(async (input, init) => {
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  }, [token]);

  const { control, setThreadId } = useChatKit({
    api: {
        ...config,
        fetch: customFetch
    },
    initialThread,
    theme: {
      colorScheme: 'dark',
      radius: 'pill',
      density: 'spacious',
      color: {
        grayscale: { hue: 29, tint: 9, shade: 4 },
        accent: { primary: '#cb7d10', level: 2 }
      },
      typography: {
        baseSize: 16,
        fontFamily: "'JetBrains Mono', monospace",
        fontFamilyMono: "'JetBrains Mono', monospace",
        fontSources: [{
            family: 'JetBrains Mono',
            style: 'normal',
            weight: 300,
            display: 'swap',
            src: 'https://fonts.gstatic.com/s/jetbrainsmono/v23/tDbV2o-flEEny0FZhsfKu5WU4xD1OwGtT0rU3BE.woff2',
            unicodeRange: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF'
          }]
      }
    },
    startScreen: {
      greeting: 'Protocol Initiated. How can I assist?',
      prompts: [
        { label: 'System Status', prompt: 'What is the status of the ChatKit system?' },
        { label: 'Components', prompt: 'What are the key components of a humanoid robot?' },
        { label: 'Actuators', prompt: 'Explain the difference between actuators and sensors.' }
      ],
    },
    composer: {
      placeholder: 'Enter Command...',
      attachments: { enabled: false },
      tools: [],
    },
    onThreadChange: ({ threadId }) => {
      // Always keep storage in sync
      localStorage.setItem(storageKey, threadId);
    },
  });

  // Restore latest thread for authenticated users if starting new
  useEffect(() => {
    const restoreLatestThread = async () => {
      // Only attempt restore if:
      // 1. User is authenticated (token exists)
      // 2. We are currently in "New Thread" mode (initialThread was null)
      // 3. We haven't already loaded a thread (check current thread via control?)
      if (!token || initialThread) return;

      try {

        const response = await customFetch(config.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'threads.list',
            params: { limit: 1, order: 'desc' }
          })
        });

        if (!response.ok) return;

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const latestThreadId = data.data[0].id;

          setThreadId(latestThreadId);
          // Update storage so next reload uses it immediately
          localStorage.setItem(storageKey, latestThreadId);
        } else {

        }
      } catch (e) {
        console.error('[ChatKitSession] Failed to restore thread:', e);
      }
    };

    restoreLatestThread();
  }, [token, initialThread, config.url, customFetch, control, storageKey, setThreadId]);

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px',
            borderRadius: '50%', background: 'rgba(203, 125, 16, 0.2)', backdropFilter: 'blur(10px)',
            border: '1px solid #cb7d10', cursor: 'pointer', boxShadow: '0 0 20px rgba(203, 125, 16, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', zIndex: 100
          }}
          aria-label="Open Chat"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cb7d10" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 5px #cb7d10)' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {isChatOpen && (
        <>
          <div onClick={() => setIsChatOpen(false)} style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(2px)', zIndex: 999
            }} />
          <div style={{
            position: 'fixed', bottom: '2rem', right: '2rem', width: '420px', height: '600px',
            maxWidth: 'calc(100vw - 4rem)', maxHeight: 'calc(100vh - 4rem)',
            background: 'rgba(15, 15, 15, 0.85)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(203, 125, 16, 0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000,
            animation: 'popupIn 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)', fontFamily: "'JetBrains Mono', monospace"
          }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <ChatKit control={control} className="chatkit-full" />
            </div>
          </div>
           <style>{`
            @keyframes popupIn {
              from { opacity: 0; transform: scale(0.95) translateY(20px); filter: blur(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
            }
          `}</style>
        </>
      )}
    </>
  );
};

const ChatKitWidget: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { chatKitUrl, chatKitDomainKey } = siteConfig.customFields as { chatKitUrl: string; chatKitDomainKey: string };

  // Use session but don't block render. Default to anonymous.
  const { data: session, isPending } = useSession();

  // Don't render anything until we know who the user is.
  // This prevents identifying as "Anonymous" during the split second where session is loading,
  // which would cause User's thread ID to be written to the anonymous key.
  if (isPending) return null;

  // Distinct storage key calculation
  // IMPORTANT: The key prop on ChatKitSession forces a full remount when this value changes.
  const storageKey = session?.user?.id
    ? `chatkit_thread_${session.user.id}`
    : 'chatkit_thread_anonymous';

  // Extract token from session (better-auth structure: data.session.token)
  const token = session?.session?.token;



  return (
    <ChatKitSession
      key={storageKey}
      storageKey={storageKey}
      config={{ url: chatKitUrl, domainKey: chatKitDomainKey }}
      token={token}
    />
  );
};

export default ChatKitWidget;
