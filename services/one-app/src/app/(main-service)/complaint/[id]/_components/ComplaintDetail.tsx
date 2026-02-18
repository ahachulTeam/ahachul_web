'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, complaintQueryKeys } from '@ahhachul/domain';
import { formatDisplayDate } from '@ahhachul/utils';

import { ReadonlyEditor } from '@/components/Editor';
import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import { cn, extractTextFromLexical, isLexicalContent } from '@/utils';

import { ComplaintTypeBadge } from './ComplaintTypeBadge';

import { getComplaintDetailPost } from '../_lib/getDetailPost';

type Props = {
  id: number;
};

export default function CommunityPostDetail({ id }: Props) {
  const pathname = usePathname() ?? '/complaint';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale);
  const { data: post } = useQuery({
    queryKey: complaintQueryKeys.detail(id),
    queryFn: getComplaintDetailPost,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.result,
  });

  console.log('post.result:', post);

  if (!post) return null;

  const title = extractTextFromLexical(post.content, post.complaintType).slice(0, 20);

  return (
    <>
      <article>
        {/* <BaseArticleImages label={post.title} images={images} /> */}
        <div className=" pt-5 px-5">
          <ComplaintTypeBadge complaintType={post.complaintType} />
          <div className=" text-title-large text-gray-90 line-clamp-2 pt-[13px] pb-4">{title}</div>
          <div className=" w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className=" flex items-center gap-1 text-body-medium">
              <span className=" text-gray-80">{post.writer || copy.common.lost112Writer}</span>
              <span className=" text-gray-70">{formatDisplayDate(post.createdAt!)}</span>
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
