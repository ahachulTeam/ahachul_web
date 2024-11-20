'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/api';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

const UseQueryComponent = () => {
  const errorQuery = useQuery({
    queryKey: ['error', 'useQuery'],
    queryFn: () => apiClient.get('/api/example-error'),
  });

  console.log({ error: errorQuery?.error });

  if (errorQuery.isLoading)
    return (
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <SpinnerIcon />
      </div>
    );

  return <div>UseQueryComponent</div>;
};

export default UseQueryComponent;
