import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { createMockUnhandledRequestStrategy, resetMockApiState } from '@ahhachul/mock-api';

import { server } from '@/mocks/server';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: createMockUnhandledRequestStrategy(),
  });
});
afterEach(() => {
  server.resetHandlers();
  resetMockApiState();
});
afterAll(() => server.close());
