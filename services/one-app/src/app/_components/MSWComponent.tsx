'use client';
import { useEffect } from 'react';
import { isMocking } from '@/envs';

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isMocking()) {
        require('@/mocks/browser');
      }
    }
  }, []);

  return null;
};
