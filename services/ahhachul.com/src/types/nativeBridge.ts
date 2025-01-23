export type WebViewMessage = {
  name: string;
  [key: string]: unknown;
};

export type NativeBridgeType = {
  send: {
    haptic: () => void;
    exitApp: () => void;
    share: (link: string) => void;
    callPhone: (number: string) => void;
    openExternalLink: (link: string) => void;
    sendTextMessage: (number: string) => void;
  };
  receive: {
    deviceInfo: () => Promise<{
      deviceId: string;
      uniqueId: string;
    }>;
  };
};
