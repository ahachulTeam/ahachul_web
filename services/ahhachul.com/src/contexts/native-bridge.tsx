import type React from 'react';
import { createContext, useEffect, useContext, useState } from 'react';

import type { NativeBridgeType } from '@/types';

interface NativeBridgeContextType {
  bridge: NativeBridgeType;
  isBridgeInitialized: boolean;
}

const NativeBridgeContext = createContext<NativeBridgeContextType | null>(null);

interface NativeBridgeProps {
  children: React.ReactNode;
}

export const NativeBridge: React.FC<NativeBridgeProps> = ({ children }) => {
  const [isBridgeInitialized, setIsBridgeInitialized] = useState(false);

  const bridge: NativeBridgeType = {
    send: {
      exitApp: () => {
        window.ReactNativeWebView?.postMessage('exitApp');
      },
      callPhone: (number: string) => {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            name: 'callPhone',
            number,
          }),
        );
      },
      sendTextMessage: (number: string) => {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            name: 'sendTextMessage',
            number,
          }),
        );
      },
      openExternalLink: (link: string) => {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            name: 'openExternalLink',
            link,
          }),
        );
      },
      haptic: () => {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            name: 'haptic',
          }),
        );
      },
      share: (link: string) => {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            name: 'share',
            link,
          }),
        );
      },
    },
    receive: {
      deviceInfo: () => {
        return new Promise(resolve => {
          const messageHandler = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.name === 'deviceInfo') {
              window.removeEventListener('message', messageHandler);
              resolve({
                deviceId: data.deviceId,
                uniqueId: data.uniqueId,
              });
            }
          };

          window.addEventListener('message', messageHandler);
          window.ReactNativeWebView?.postMessage('getDeviceInfo');
        });
      },
    },
  };

  useEffect(() => {
    if (window.ReactNativeWebView) {
      setIsBridgeInitialized(true);
    }
  }, []);

  return (
    <NativeBridgeContext.Provider value={{ bridge, isBridgeInitialized }}>
      {children}
    </NativeBridgeContext.Provider>
  );
};

export const useNativeBridge = () => {
  const context = useContext(NativeBridgeContext);
  if (!context) {
    throw new Error('useNativeBridge must be used within NativeBridgeProvider');
  }
  return context;
};
