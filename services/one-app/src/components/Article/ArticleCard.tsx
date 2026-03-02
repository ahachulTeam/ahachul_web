'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { formatDisplayDate } from '@ahhachul/utils';

import type { IPost } from '@/types';
import { cn, isLexicalContent } from '@/utils';

import { ReadonlyEditor } from '../Editor';

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props) => {
  return (
    <article className="border-b border-b-gray-20 px-4 py-4 last:border-b-0">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2.5">
          <div className="w-full min-w-0 flex-col gap-1.5">
            <div className="line-clamp-1 text-title-medium text-gray-100">{post.title}</div>
            {isLexicalContent(post.content) ? (
              <ReadonlyEditor
                content={post.content}
                className={cn(
                  'p-0',
                  '[&>div>div]:p-0',
                  '[&>div>div]:border-none',
                  '[&>div>div]:max-h-[48px]',
                )}
              />
            ) : (
              <div className="line-clamp-2 text-body-medium text-gray-80">{post.content}</div>
            )}
          </div>
          {post?.imageUrl && (
            <div className="relative flex h-[74px] w-[74px] min-w-[74px] items-center justify-center overflow-hidden rounded-xl border border-gray-20 bg-gray-20">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                src={post.imageUrl}
                alt={`${post.title} - ${post.createdAt}`}
                className="absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-body-small text-gray-70">
            <span className="rounded-full bg-gray-20 px-2 py-0.5 text-[11px] text-gray-80">
              {post.writer || '로스트 112'}
            </span>
            <span>{formatDisplayDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-body-small text-gray-70">
            <span>댓글</span>
            <span className="font-semibold text-gray-90">{post.commentCnt}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
