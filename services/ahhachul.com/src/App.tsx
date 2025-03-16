import React from 'react';

import { StackFlow } from '@/stackflow';

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks');
  worker.start();
}

function App() {
  return (
    <React.Suspense fallback={null}>
      <StackFlow.Routes />
    </React.Suspense>
  );
}

export default App;
