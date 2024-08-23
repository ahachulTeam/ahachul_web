import { setupServer } from 'msw/node';
import { handlers } from './__mocks__';

export const server = setupServer(...handlers);
