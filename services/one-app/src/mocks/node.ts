import { setupServer } from 'msw/node';

import { createMockUnhandledRequestStrategy, mockApiHandlers } from '@ahhachul/mock-api';

const server = setupServer(...mockApiHandlers);

let isNodeServerStarted = false;

export function startNodeMocking() {
  if (isNodeServerStarted) {
    return;
  }

  server.listen({
    onUnhandledRequest: createMockUnhandledRequestStrategy(),
  });
  isNodeServerStarted = true;
}

export function stopNodeMocking() {
  if (!isNodeServerStarted) {
    return;
  }

  server.close();
  isNodeServerStarted = false;
}

export function getNodeMockServer() {
  return server;
}
