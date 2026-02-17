'use client';

import { createMockUnhandledRequestStrategy, mockApiHandlers } from '@ahhachul/mock-api';

let workerStartPromise: Promise<void> | null = null;

export async function startBrowserMocking() {
  if (workerStartPromise) {
    await workerStartPromise;
    return;
  }

  workerStartPromise = (async () => {
    const { setupWorker } = await import('msw/browser');
    const worker = setupWorker(...mockApiHandlers);

    await worker.start({
      onUnhandledRequest: createMockUnhandledRequestStrategy(),
    });
  })().catch(error => {
    workerStartPromise = null;
    throw error;
  });

  await workerStartPromise;
}
