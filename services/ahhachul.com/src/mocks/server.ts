import { setupServer } from 'msw/node';

import { handlers } from './handlers/example';

export const server = setupServer(...handlers);
