import { useEffect } from 'react';

const INITIAL_LOADER_HIDE_DELAY_MS = 500;

export const useInitialLoader = () => {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        loader.style.display = 'none';
      }, INITIAL_LOADER_HIDE_DELAY_MS);
    }
  }, []);
};
