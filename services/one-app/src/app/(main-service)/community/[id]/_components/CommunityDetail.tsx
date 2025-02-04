'use client';

import { useQuery } from '@tanstack/react-query';

import { formatDateTime } from '@ahhachul/utils';

import { ReadonlyEditor } from '@/component/Editor';
// import { SUBWAY_LOGO_SVG_LIST } from '@/component';
import { TIMESTAMP } from '@/constant';
import { cn, isLexicalContent } from '@/util';

import { CommunityTypeBadge } from './CommunityTypeBadge';

import { getCommunityDetailPost } from '../_lib/getDetailPost';

type Props = {
  id: number;
};

export default function CommunityPostDetail({ id }: Props) {
  const { data: post } = useQuery({
    queryKey: ['community-post', id],
    queryFn: getCommunityDetailPost,
    staleTime: 5 * TIMESTAMP.MINUTE,
    select: res => res.result,
  });

  if (!post) return null;

  // const images = post.isFromLost112
  //   ? [
  //       {
  //         imageId: getRandomInt(),
  //         imageUrl: post.externalSourceImageUrl,
  //       },
  //     ]
  //   : post.images;

  return (
    <>
      <article>
        {/* <BaseArticleImages label={post.title} images={images} /> */}
        <div className=" pt-5 px-5">
          <CommunityTypeBadge communityType={post.categoryType} />
          <div className=" text-title-large text-gray-90 line-clamp-2 pt-[13px] pb-4">
            {post.title}
          </div>
          <div className=" w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className=" flex items-center gap-1 text-body-medium">
              <span className=" text-gray-80">{post.writer || '로스트 112'}</span>
              <span className=" text-gray-70">{formatDateTime(post.createdAt!)}</span>
            </div>
            <div className=" flex items-center text-gray-90 text-label-medium font-regular">
              {/* {SUBWAY_LOGO_SVG_LIST[post.subwayLineId]} */}
            </div>
          </div>
        </div>

        <div className=" px-5">
          {isLexicalContent(post.content) ? (
            <ReadonlyEditor
              content={post.content}
              className={cn('px-0', 'py-6', '[&>div>div]:p-0', '[&>div>div]:border-none')}
            />
          ) : (
            <p className=" py-6 mb-3 text-body-large-semi text-gray-90">{post.content}</p>
          )}
        </div>
      </article>

      {/* <LostFoundCommentList commentCnt={post.commentCnt} articleId={lostId} /> */}
      {/* <CommentTextField
        placeholder={`${post.writer ?? '로스트 112'}에게 댓글을 남겨주세요.`}
        onSubmit={handleSubmitComment}
        onChange={handleChangeComment}
      /> */}
    </>
  );
}
