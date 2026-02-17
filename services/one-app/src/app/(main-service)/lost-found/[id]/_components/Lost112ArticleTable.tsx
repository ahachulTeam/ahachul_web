'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { formatDisplayDate } from '@ahhachul/utils';

import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import type { LostFoundPostDetail } from '@/types';

interface Props {
  post: LostFoundPostDetail;
}

export const Lost112ArticleTable = ({ post }: Props) => {
  const pathname = usePathname() ?? '/lost-found';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).lost112Table;

  return (
    <div className="max-w bg-gray-20 px-5 py-4">
      <div className="bg-gray-0 rounded-lg px-5 py-4">
        <h2 className="text-gray-80 text-label-medium pb-4 border-b border-b-gray-20">
          {copy.title}
        </h2>

        <div className="grid grid-cols-[120px,1fr] gap-y-4 text-sm py-3 px-[5px]">
          <div className="text-gray-80 text-label-medium">{copy.acquiredDate}</div>
          <div className="text-gray-90 text-label-medium">{formatDisplayDate(post.createdAt)}</div>

          {post?.storage && (
            <>
              <div className="text-gray-80 text-label-medium">{copy.acquiredLocation}</div>
              <div className="text-gray-90 text-label-medium">{post.storage}</div>
            </>
          )}

          {post?.categoryName && (
            <>
              <div className="text-gray-80 text-label-medium">{copy.category}</div>
              <div className="text-gray-90 text-label-medium">{post.categoryName}</div>
            </>
          )}

          {post?.storageNumber && (
            <>
              <div className="text-gray-80 text-label-medium">{copy.storagePhone}</div>
              <div className="text-gray-90 text-label-medium">{post.storageNumber}</div>
            </>
          )}

          {post?.storage && (
            <>
              <div className="text-gray-80 text-label-medium">{copy.storagePlace}</div>
              <div className="text-gray-90 text-label-medium">{post.storage}</div>
            </>
          )}

          {post?.pageUrl && (
            <>
              <div className="text-gray-80 text-label-medium">{copy.sourcePost}</div>
              <Link
                href={post.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-label-medium"
              >
                {copy.openLink}
              </Link>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-green-600 justify-center">
          <div className="w-2 h-2 rounded-full bg-green-600 "></div>
          <span className="text-sm">
            {post.status === 'PROGRESS' ? copy.statusProgress : copy.statusDone}
          </span>
        </div>
      </div>
    </div>
  );
};
