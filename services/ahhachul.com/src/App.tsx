import React from 'react';

import { StackFlow } from '@/stackflow';

import { UiComponent } from './components';
import { useInitialLoader } from './hooks/domain/home/useInitialLoader';

function App() {
  useInitialLoader();

  return (
    <React.Suspense fallback={null}>
      <StackFlow.Routes />
      <UiComponent.ToastContainerComponent />
    </React.Suspense>
  );
}

export default App;
