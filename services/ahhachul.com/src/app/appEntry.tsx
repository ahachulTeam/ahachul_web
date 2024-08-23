import React from 'react';
import { Stack } from './stackflow';

export function AppEntry() {
  return (
    <React.Suspense fallback={null}>
      <Stack />
    </React.Suspense>
  );
}

export default AppEntry;
