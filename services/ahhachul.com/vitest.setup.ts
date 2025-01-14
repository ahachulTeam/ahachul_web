import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { server } from 'shared/lib/__mocks__/server';
import { beforeAll, beforeEach, afterEach, afterAll, vi } from 'vitest';

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  setupIntersectionMocking(vi.fn);
});

afterEach(() => {
  cleanup();
  resetIntersectionMocking();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
