'use client';

import Image from 'next/image';

import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor';
import { BaseArticleImages, CommentTextField, SUBWAY_LOGO_SVG_LIST } from '@/common/components';
import { cn, formatDate, getRandomInt, isLexicalContent } from '@/common/utils';

import { LostFoundCommentList } from './CommentList';
import { Lost112ArticleTable } from './Lost112ArticleTable';
import { LostTypeBadge } from './LostTypeBadge';
import { RecommendArticles } from './RecommendArticles';

import { useGetLostFoundDetail, useLostFoundComment } from '../../_lib';

type Props = {
  lostId: number;
};

export const LostFoundPostDetail = ({ lostId }: Props) => {
  const { data: post } = useGetLostFoundDetail(lostId);
  const isLexicalSyntaxContent = isLexicalContent(post.content);

  const { handleChangeComment, handleSubmitComment } = useLostFoundComment(lostId);

  const images = post.isFromLost112
    ? [
        {
          imageId: getRandomInt(),
          imageUrl: post.externalSourceImageUrl,
        },
      ]
    : post.images;

  return (
    <>
      <article>
        <BaseArticleImages label={post.title} images={images} />
        <div className=" pt-5 px-5">
          <LostTypeBadge lostFoundType={post.lostType} />
          <div className=" text-title-large text-gray-90 line-clamp-2 pt-[13px] pb-4">
            {post.title}
          </div>
          <div className=" w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className=" flex items-center gap-1 text-body-medium">
              <span className=" text-gray-80">{post.writer || '로스트 112'}</span>
              <span className=" text-gray-70">{formatDate(post.createdAt)}</span>
            </div>
            <div className=" flex items-center text-gray-90 text-label-medium font-regular">
              {SUBWAY_LOGO_SVG_LIST[post.subwayLineId]}
            </div>
          </div>
        </div>
        {post.isFromLost112 && (
          <>
            <div className=" px-5 flex items-center h-14 w-full gap-2">
              <Image
                src="/images/lost112.png"
                alt="lost112-image"
                width={24}
                height={24}
                priority
              />
              <span className=" text-gray-90 text-label-medium">
                로스트 112에 등록된 분실물입니다.
              </span>
            </div>
            <Lost112ArticleTable post={post} />
          </>
        )}
        <div className=" px-5">
          {isLexicalSyntaxContent ? (
            <LexicalSyntaxContentParser
              content={post.content}
              className={cn('px-0', 'py-6', '[&>div>div]:p-0', '[&>div>div]:border-none')}
            />
          ) : (
            <p className=" py-6 mb-3 text-body-large-semi text-gray-90">{post.content}</p>
          )}
        </div>
      </article>

      <RecommendArticles posts={post.recommendPosts} />
      <LostFoundCommentList commentCnt={post.commentCnt} articleId={lostId} />
      <CommentTextField
        placeholder={`${post.writer ?? '로스트 112'}에게 댓글을 남겨주세요.`}
        onSubmit={handleSubmitComment}
        onChange={handleChangeComment}
      />
    </>
  );
};
