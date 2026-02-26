interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
  daum?: {
    Postcode: new (options: {
      oncomplete: (data: { address: string; roadAddress?: string; jibunAddress?: string }) => void;
    }) => {
      open: () => void;
    };
  };
}
