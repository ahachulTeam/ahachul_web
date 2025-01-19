'use client';

<<<<<<< HEAD
import { useIsDeferred } from '@/common/hooks';
import { cn } from '@/common/utils';
=======
import React from 'react';

import { cn } from '@/common/utils';
import { useIsDeferred } from '@/common/hooks';
>>>>>>> main

import { BaseSkeleton } from '../BaseSkeleton';

export const CommentListSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred(500);

  return isDeferred ? (
    <section
      className={cn(
        'opacity-0',
        'animate-[fadeIn_0.5s_ease-in-out_forwards]',
        'animation-delay-100',
      )}
    >
      {new Array(3).fill('').map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'flex flex-col border-b border-b-gray-20 bg-gray-10 px-5 py-4',
            'opacity-0',
            'animate-[fadeIn_0.5s_ease-in-out_forwards]',
            `animation-delay-${(idx + 1) * 100}`,
          )}
        >
          <div className="flex items-center justify-between pb-2">
            <BaseSkeleton width={50} height={14} radius={6} />
            <BaseSkeleton width={20} height={14} radius={6} />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <BaseSkeleton width={150} height={32} radius={6} />
            <BaseSkeleton width={100} height={14} radius={6} />
          </div>
        </div>
      ))}
    </section>
  ) : null;
};
