export const NATIVE_CUSTOM_EVENTS = {
  KAKAO_LOGIN: 'kakaoLogin',
  APPLE_LOGIN: 'appleLogin',
  KAKAO_LOGIN_CALLBACK: 'kakaoLoginCallback',
  APPLE_LOGIN_CALLBACK: 'appleLoginCallback',
  VIBRATE: 'vibrate',
  HAPTIC: 'haptic',
  FOREGROUND_FCM: 'foregroundFcm',
} as const;

export const NATIVE_METHODS = {
  HAPTIC: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.HAPTIC,
      }),
    );
  },
  VIBRATE: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.VIBRATE,
      }),
    );
  },
};
