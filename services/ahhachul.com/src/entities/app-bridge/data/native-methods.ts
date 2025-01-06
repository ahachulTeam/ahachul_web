// import { isWebView } from 'shared/lib/config/app-env';

export const NATIVE_CUSTOM_EVENTS = {
  VIBRATE: 'vibrate',
  HAPTIC: 'haptic',
  OPEN_EXTERNAL_LINK: 'openExternalLink',
  SEND_TEXT_MESSAGE: 'sendTextMessage',
  CALL_PHONE: 'callPhone',
  SHARE: 'share',
  FOREGROUND_FCM: 'foregroundFcm',
  GET_DEVICE_INFO: 'getDeviceInfo',
} as const;

export const nativeMethodUtils = {
  haptic: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.HAPTIC,
      }),
    );
  },
  vibrate: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.VIBRATE,
      }),
    );
  },
  openExternalLink: (link: string) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        link,
        type: NATIVE_CUSTOM_EVENTS.OPEN_EXTERNAL_LINK,
      }),
    );
  },
  share: (link: string) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        link,
        type: NATIVE_CUSTOM_EVENTS.SHARE,
      }),
    );
  },
  sendTextMessage: (number: number) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        number,
        type: NATIVE_CUSTOM_EVENTS.SEND_TEXT_MESSAGE,
      }),
    );
  },
  callPhone: (number: number) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        number,
        type: NATIVE_CUSTOM_EVENTS.CALL_PHONE,
      }),
    );
  },
  getDeviceInfo: () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.GET_DEVICE_INFO,
      }),
    );
  },
};

// export const nativeMethodUtils = () => {
//   return isWebView()
//     ? () => ({
//         haptic: () => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               type: NATIVE_CUSTOM_EVENTS.HAPTIC,
//             }),
//           );
//         },
//         vibrate: () => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               type: NATIVE_CUSTOM_EVENTS.VIBRATE,
//             }),
//           );
//         },
//         openExternalLink: (link: string) => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               link,
//               type: NATIVE_CUSTOM_EVENTS.OPEN_EXTERNAL_LINK,
//             }),
//           );
//         },
//         share: (link: string) => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               link,
//               type: NATIVE_CUSTOM_EVENTS.SHARE,
//             }),
//           );
//         },
//         sendTextMessage: (number: number) => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               number,
//               type: NATIVE_CUSTOM_EVENTS.SEND_TEXT_MESSAGE,
//             }),
//           );
//         },
//         callPhone: (number: number) => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               number,
//               type: NATIVE_CUSTOM_EVENTS.CALL_PHONE,
//             }),
//           );
//         },
//         getDeviceInfo: () => {
//           window.ReactNativeWebView?.postMessage(
//             JSON.stringify({
//               type: NATIVE_CUSTOM_EVENTS.GET_DEVICE_INFO,
//             }),
//           );
//         },
//       })
//     : null;
// };
