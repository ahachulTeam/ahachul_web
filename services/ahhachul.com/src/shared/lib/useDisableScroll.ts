import { useEffect } from 'react';

function useDisableScroll() {
  const disableScroll = (disable: boolean) => {
    document.body.style.overflowY = disable ? 'hidden' : 'scroll';
  };

  useEffect(() => {
    disableScroll(true);

    return () => {
      disableScroll(false);
    };
  }, []);
}

export default useDisableScroll;
