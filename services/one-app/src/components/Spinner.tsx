'use client';

import type { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import animationData from '@/assets/lottie/loading.json';

interface SpinnerProps {
  full?: boolean;
  children?: ReactNode;
  zTier?: number;
  zIndex?: number;
}

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(module => module.Player),
  {
    ssr: false,
  },
);

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
