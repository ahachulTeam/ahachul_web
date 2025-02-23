import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

function render() {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <Suspense fallback={null}>
      <App />
    </Suspense>,
  );
}

export { render };
