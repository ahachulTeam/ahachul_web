'use client';

import React from 'react';
import { useIsDeferred } from '@/common/hooks/useIsDeferred';
import { cn } from '@/common/utils/cn';
import { BaseSkeleton } from '../BaseSkeleton';

export const ArticleDetailSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred(500);

  return isDeferred ? (
    <>
      <article
        className={cn(
          'pt-5',
          'opacity-0',
          'animate-[fadeIn_0.5s_ease-in-out_forwards]',
          'motion-reduce:animate-none',
        )}
      >
        <div className="px-5">
          {/* LostTypeBadge 스켈레톤 */}
          <BaseSkeleton width={60} height={26} radius={13} />

          {/* 제목 스켈레톤 */}
          <div className="pt-[13px] pb-4">
            <BaseSkeleton width="50%" height={21} radius={6} />
          </div>

          {/* 메타 정보 스켈레톤 */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className="flex items-center gap-1 text-body-medium">
              <BaseSkeleton width={80} height={16} radius={6} />
              <BaseSkeleton width={100} height={16} radius={6} />
            </div>
            <div className="flex items-center">
              <BaseSkeleton width={24} height={24} radius={12} />
            </div>
          </div>

          {/* 본문 내용 스켈레톤 */}
          <div className="py-6 mb-3">
            <BaseSkeleton
              width="60%"
              height={21}
              radius={6}
              className="mb-0.5"
            />
            <BaseSkeleton
              width="90%"
              height={21}
              radius={6}
              className="mb-0.5"
            />
            <BaseSkeleton width="30%" height={21} radius={6} />
          </div>
        </div>

        {/* 하단 댓글 카운트 및 북마크 영역 스켈레톤 */}
        <div className="border-t border-t-gray-30 h-[50px] flex items-center justify-between px-5">
          <div className="flex items-center gap-1">
            <BaseSkeleton width={60} height={16} radius={6} />
          </div>
          <div className="flex items-center">
            <BaseSkeleton width={24} height={24} radius={12} />
          </div>
        </div>
      </article>

      {/* 댓글 목록 스켈레톤 */}
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
    </>
  ) : null;
};
