import { isMocking } from './constants';

const initMocking = async () => {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');

    worker.start({ onUnhandledRequest: 'bypass' });
  }
};

export { initMocking, isMocking };
