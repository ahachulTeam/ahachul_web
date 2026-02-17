import { setupWorker } from 'msw/browser';

import { mockApiHandlers } from '@ahhachul/mock-api';

export const worker = setupWorker(...mockApiHandlers);
