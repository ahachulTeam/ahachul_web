'use client';

import type { ReactNode } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import animationData from '@/asset/lottie/loading.json';

interface SpinnerProps {
  full?: boolean;
  children?: ReactNode;
  zTier?: number;
  zIndex?: number;
}

export function Spinner({ full, children, zTier = 0, zIndex = 10 }: SpinnerProps) {
  const calculatedZIndex = zTier * 100 + zIndex;

  return (
    <div
      className={`
        fixed inset-0 w-full h-full table
        ${full ? 'bg-white' : ''}
      `}
      style={{ zIndex: calculatedZIndex }}
    >
      <div className={`table-cell align-middle text-center`}>
        <div className="mx-auto w-28 h-28 bg-no-repeat animate-spinner">
          <Player
            loop
            autoplay
            src={animationData}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
