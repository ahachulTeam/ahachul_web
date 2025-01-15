declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export {};
