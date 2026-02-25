'use client';

import { createMockUnhandledRequestStrategy, mockApiHandlers } from '@ahhachul/mock-api';

import { createActionLogger } from '@/lib/observability';

let workerStartPromise: Promise<void> | null = null;
const mockWorkerLogger = createActionLogger('mock-worker');

export async function startBrowserMocking() {
  if (workerStartPromise) {
    mockWorkerLogger.info('reuse-existing-start-promise');
    await workerStartPromise;
    return;
  }

  mockWorkerLogger.start('start-browser-mocking', { handlerCount: mockApiHandlers.length });
  workerStartPromise = (async () => {
    const { setupWorker } = await import('msw/browser');
    const worker = setupWorker(...mockApiHandlers);

    await worker.start({
      onUnhandledRequest: createMockUnhandledRequestStrategy(),
    });
    mockWorkerLogger.success('start-browser-mocking', { handlerCount: mockApiHandlers.length });
  })().catch(error => {
    workerStartPromise = null;
    mockWorkerLogger.fail(
      'start-browser-mocking',
      error,
      { handlerCount: mockApiHandlers.length },
      'mock 워커를 시작하지 못했습니다.',
    );
    throw error;
  });

  await workerStartPromise;
}
