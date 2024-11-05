'use client';

import { useSearchParams } from 'next/navigation';

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error) {
    return <p className="text-red-500">Login failed!</p>;
  }
  return null;
} 
