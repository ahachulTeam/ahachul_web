import { createMockUnhandledRequestStrategy } from '@ahhachul/mock-api';

import { worker } from './browser';

let isWorkerStarted = false;

export async function startBrowserMocking() {
  if (isWorkerStarted) {
    return;
  }

  await worker.start({
    onUnhandledRequest: createMockUnhandledRequestStrategy(),
  });
  isWorkerStarted = true;
}

export * from './browser';
