import { setupServer } from 'msw/node';

import { mockApiHandlers } from '@ahhachul/mock-api';

export const server = setupServer(...mockApiHandlers);
