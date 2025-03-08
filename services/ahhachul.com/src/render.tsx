import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const App = React.lazy(() => import('./App'));

function render() {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <Suspense fallback={null}>
      <App />
    </Suspense>,
  );
}

export { render };
