import React, { useCallback, useState, useEffect } from 'react';

export const useDetectOnline = () => {
  const [isOffline, setIsOffline] = useState(false);
  const handleNetworkOnline = () => setIsOffline(false);
  const handleNetworkOffline = () => setIsOffline(true);

  const addNetworkStateEventListener = () => {
    window.addEventListener('online', handleNetworkOnline);
    window.addEventListener('offline', handleNetworkOffline);
  };

  const removeNetworkStateEventListener = () => {
    window.removeEventListener('online', handleNetworkOnline);
    window.removeEventListener('offline', handleNetworkOffline);
  };

  useEffect(() => {
    addNetworkStateEventListener();

    return removeNetworkStateEventListener;
  }, []);

  const runIfOnline = useCallback(
    ({
      onNowOnline,
      onNowOffline,
    }: {
      onNowOnline: () => void;
      onNowOffline: () => void;
    }) => {
      if (window.navigator.onLine) {
        onNowOnline();
      } else {
        onNowOffline();
        window.addEventListener('online', onNowOnline, { once: true });
      }
    },
    [],
  );

  return { isOffline, runIfOnline };
};
