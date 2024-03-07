import React from 'react';

import { Stack } from 'stackflow';

function App() {
  return (
    <React.Suspense fallback={null}>
      <Stack />
    </React.Suspense>
  );
}

export default App;
