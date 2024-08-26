import React from 'react';
import { Stack } from './stackflow';

export const AppEntry = () => {
  return (
    <React.Suspense fallback={null}>
      <Stack />
    </React.Suspense>
  );
};
