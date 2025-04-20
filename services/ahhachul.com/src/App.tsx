import React from 'react';

import { StackFlow } from '@/stackflow';

import { UiComponent } from './components';

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks');
  worker.start();
}

function App() {
  return (
    <React.Suspense fallback={null}>
      <StackFlow.Routes />
      <UiComponent.ToastContainerComponent />
    </React.Suspense>
  );
}

export default App;
