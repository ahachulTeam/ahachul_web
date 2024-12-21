import React from 'react';
import { useIsDeferred } from '@/common/hooks/useIsDeferred';
import { cn } from '@/common/utils/cn';
import EllipsisHorizontalIcon from '@/common/assets/icons/svgs/ellipsis.svg';
import { BaseSkeleton } from '../BaseSkeleton';

export const CommentListSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred(500);

  return isDeferred ? (
    <section
      className={cn(
        'opacity-0',
        'animate-[fadeIn_0.5s_ease-in-out_forwards]',
        'motion-reduce:animate-none', // 사용자가 모션 감소를 선호하는 경우 애니메이션 비활성화
      )}
    >
      {new Array(5).fill('').map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'flex flex-col border-b border-b-gray-20 bg-gray-10 px-5 py-4',
            // 각 아이템에 지연된 페이드인 효과 추가
            'opacity-0',
            'animate-[fadeIn_0.5s_ease-in-out_forwards]',
            `animation-delay-${idx * 100}`, // 각 아이템마다 지연 시간 추가
          )}
        >
          <div className="flex items-center justify-between pb-2">
            <BaseSkeleton width={50} height={14} radius={6} />
            <EllipsisHorizontalIcon />
          </div>
          <div className="flex flex-col gap-3 pb-5">
            <BaseSkeleton width={150} height={32} radius={6} />
            <span className="text-body-small text-gray-70">
              <BaseSkeleton
                width={150}
                height={14}
                radius={6}
                className="mt-1.5"
              />
            </span>
          </div>
        </div>
      ))}
    </section>
  ) : null;
};
