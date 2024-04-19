import { useCallback, useEffect } from 'react';

function useVisibilityStateVisible(onAction: VoidFunction) {
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      onAction();
    }
  }, [onAction]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]); // 빈 의존성 배열을 전달하여 이 훅이 컴포넌트가 마운트되거나 언마운트될 때만 실행되도록 합니다.
}
export default useVisibilityStateVisible;
