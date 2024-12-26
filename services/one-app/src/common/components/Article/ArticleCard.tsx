import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import type { Post } from '@/model/Post';
import { cn } from '@/common/utils/cn';
import { isLexicalContent } from '@/common/utils/validate';
import { SUBWAY_LOGO_SVG_LIST } from '@/common/components/Subway/subway-logo-icon-map';
import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor/LexicalSyntaxContentParser';
import Dot from '@/common/assets/icons/svgs/dot.svg';
import CommentIcon from '@/common/assets/icons/comment';
import { formatDate } from '@/common/utils/date';

interface Props {
  post: Post;
}

const ArticleCard = ({ post }: Props) => {
  const isLexicalSyntaxContent = isLexicalContent(post.content);

  return (
    <article className=" py-6 px-5 border-b border-b-gray-20">
      <div className=" flex flex-col gap-3">
        <div className=" flex gap-1.5">
          <div className=" w-full flex flex-col gap-1.5">
            <div className=" text-title-small text-gray-90">{post.title}</div>
            {isLexicalSyntaxContent ? (
              <LexicalSyntaxContentParser
                content={post.content}
                className={cn(
                  'p-0',
                  '[&>div>div]:p-0',
                  '[&>div>div]:border-none',
                  '[&>div>div]:max-h-[46px]',
                )}
              />
            ) : (
              <div className=" text-body-medium text-gray-90 line-clamp-2">
                {post.content}
              </div>
            )}
          </div>
          {post?.imageUrl && (
            <div className=" flex items-center justify-center relative w-[66px] min-w-[66px] max-w-[66px] h-[66px] min-h-[66px] max-h-[66px]">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                src={post.imageUrl}
                alt={`${post.title} - ${post.createdAt}`}
                className=" absolute top-0 left-0 w-full h-full object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-1 text-gray-80 text-body-medium">
            {SUBWAY_LOGO_SVG_LIST[post.subwayLineId]}
            <Dot className=" relative top-[1px]" />
            <span>{post.writer || 'LOST112'}</span>
            <Dot className=" relative top-[1px]" />
            <span>{formatDate(post.createdAt, false)}</span>
          </div>
          <div className=" flex items-center gap-0.5 text-gray-80 text-body-medium">
            <CommentIcon />
            <span>{post.commentCnt}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
