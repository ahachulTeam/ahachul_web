'use client';

import { DotIcon } from '@/common/assets/icons';
import { useIsDeferred } from '@/common/hooks';
import { cn } from '@/common/utils';

import { BaseSkeleton } from '../BaseSkeleton';

export const ArticleListSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred(500);

  return isDeferred ? (
    <section
      className={cn(
        'opacity-0',
        'animate-[fadeIn_0.5s_ease-in-out_forwards]',
        'motion-reduce:animate-none',
      )}
    >
      {new Array(5).fill('').map((_, idx) => (
        <article
          key={idx}
          className={cn(
            'py-6 px-5',
            'opacity-0',
            'animate-[fadeIn_0.5s_ease-in-out_forwards]',
            `animation-delay-${idx * 100}`,
            'border-b',
            'border-b-gray-20',
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-1.5">
              <div className="w-full flex flex-col gap-1.5">
                <BaseSkeleton width={100} height={23} radius={6} />
                <BaseSkeleton width={170} height={21} radius={6} />
              </div>
              {/* 이미지 스켈레톤 - 필요한 경우 활성화 */}
              <div className="flex items-center justify-center relative w-[66px] min-w-[66px] aspect-square">
                <BaseSkeleton width={66} height={66} radius={6} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-80 text-body-medium">
                <BaseSkeleton width={24} height={24} radius={12} />
                <DotIcon className="relative top-[1px]" />
                <BaseSkeleton width={60} height={16} radius={6} />
                <DotIcon className="relative top-[1px]" />
                <BaseSkeleton width={80} height={16} radius={6} />
              </div>
              <div className="flex items-center gap-0.5 text-gray-80">
                <BaseSkeleton width={20} height={16} radius={6} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  ) : null;
};
