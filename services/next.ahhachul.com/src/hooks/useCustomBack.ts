import { useEffect } from 'react';

function useCustomBack(customBack: () => void) {
  const browserPreventEvent = (event: () => void) => {
    event();
  };

  useEffect(() => {
    const backAction = () => browserPreventEvent(customBack);

    history.pushState({}, '', location.href);
    window.addEventListener('popstate', backAction);
    return () => {
      window.removeEventListener('popstate', backAction);
    };
  }, []);
}

export default useCustomBack;
