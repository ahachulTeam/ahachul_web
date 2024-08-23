import { setupWorker } from 'msw/browser';
import { handlers } from './__mocks__';

export const worker = setupWorker(...handlers);
