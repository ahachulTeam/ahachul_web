'use client';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/api';

const UseSuspenseQueryComponent = () => {
  const errorQuery = useSuspenseQuery({
    queryKey: ['error', 'useSuspenseQuery'],
    queryFn: () => apiClient.get('/api/example-error'),
  });

  console.log({ data: errorQuery?.data });

  return <div>UseSuspenseQueryComponent</div>;
};

export default UseSuspenseQueryComponent;
