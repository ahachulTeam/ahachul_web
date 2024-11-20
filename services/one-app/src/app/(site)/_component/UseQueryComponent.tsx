'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/api';

const UseQueryComponent = () => {
  const errorQuery = useQuery({
    queryKey: ['error', 'useQuery'],
    queryFn: () => apiClient.get('/api/example-error'),
  });

  console.log({ error: errorQuery?.error });

  return <div>UseQueryComponent</div>;
};

export default UseQueryComponent;
