'use client';

import React from 'react';

import { SUBWAY_LOGO_SVG_LIST } from '@/common/components/Subway/subway-logo-icon-map';
import LostTypeBadge from './LostTypeBadge';
import { LostFoundCommentList } from './CommentList';
import { useGetLostFoundDetail } from '../../_lib/get';
import { formatDate } from '@/common/utils/date';
import { isLexicalContent } from '@/common/utils/validate';
import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor/LexicalSyntaxContentParser';
import { cn } from '@/common/utils/cn';
import RecommendArticles from './RecommendArticles';
import CommentTextField from './CommentTextField';

type Props = {
  lostId: number;
};

const LostFoundPostDetail = ({ lostId }: Props) => {
  const { data: post } = useGetLostFoundDetail(lostId);
  const isLexicalSyntaxContent = isLexicalContent(post.content);

  return (
    <>
      <article className=" pt-5">
        <div className=" px-5">
          <LostTypeBadge lostFoundType={post.lostType} />
          <div className=" text-title-large text-gray-90 line-clamp-2 pt-[13px] pb-4">
            {post.title}
          </div>
          <div className=" w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className=" flex items-center gap-1 text-body-medium">
              <span className=" text-gray-80">{post.writer || 'LOST112'}</span>
              <span className=" text-gray-70">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className=" flex items-center text-gray-90 text-label-medium font-regular">
              {SUBWAY_LOGO_SVG_LIST[post.subwayLineId]}
            </div>
          </div>
          {isLexicalSyntaxContent ? (
            <LexicalSyntaxContentParser
              content={post.content}
              className={cn(
                'px-0',
                'py-6',
                '[&>div>div]:p-0',
                '[&>div>div]:border-none',
              )}
            />
          ) : (
            <p className=" py-6 mb-3 text-body-large-semi text-gray-90">
              {post.content}
            </p>
          )}
        </div>
      </article>

      <RecommendArticles posts={post.recommendPosts} />
      <LostFoundCommentList commentCnt={post.commentCnt} articleId={lostId} />
      <CommentTextField placeholder={`${post.writer}에게 댓글을 남겨주세요.`} />
    </>
  );
};

export default LostFoundPostDetail;
