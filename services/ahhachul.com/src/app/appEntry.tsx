import React from 'react';
import { Loading } from 'entities/app-loaders';
import { Stack } from './stackflow';

export const AppEntry = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Stack />
    </React.Suspense>
  );
};
