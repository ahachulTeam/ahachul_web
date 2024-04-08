import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { addSnackBar } from '@/src/stores/ui';
// import { NATIVE_CUSTOM_EVENTS } from '@/src/utils/nativeMethod';

const useForegroundNotification = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const webForegroundNotificationEventListener = (event: CustomEvent) => {
    //   dispatch(
    //     addSnackBar({
    //       message: event.detail.data.data,
    //     }),
    //   );
    // };
    // document.addEventListener(
    //   NATIVE_CUSTOM_EVENTS.FOREGROUND_FCM,
    //   webForegroundNotificationEventListener as EventListener,
    // );
  }, []);
};

export default useForegroundNotification;
