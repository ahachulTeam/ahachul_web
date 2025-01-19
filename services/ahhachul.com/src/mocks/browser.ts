import { setupWorker } from 'msw/browser';

import { handlers } from './handlers/example';

export const worker = setupWorker(...handlers);
