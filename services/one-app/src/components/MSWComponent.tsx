'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const shouldMock = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
  const [isReady, setIsReady] = useState(!shouldMock);

  useEffect(() => {
    if (!shouldMock) {
      return;
    }

    const startMocking = async () => {
      const { startBrowserMocking } = await import('@/mocks/browser');
      await startBrowserMocking();
      setIsReady(true);
    };

    void startMocking();
  }, [shouldMock]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
