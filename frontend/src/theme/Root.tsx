import React from 'react';
import ChatKitWidget from '../components/ChatKitWidget';

// Default implementation, that you can customize
export default function Root({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <ChatKitWidget />
    </>
  );
}
