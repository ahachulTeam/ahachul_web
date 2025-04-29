import { useEffect } from 'react';

export const useInitialLoader = () => {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, []);
};
