import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { UiComponent } from './components';

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<UiComponent.LoadingSpinner opacity={1} />}>
    <App />
  </Suspense>,
);
