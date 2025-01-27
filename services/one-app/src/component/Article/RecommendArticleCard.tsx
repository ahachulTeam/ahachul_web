'use client';

import { DotIcon } from '@/asset/icon';
import type { RecommendPost } from '@/model';
import { formatDate } from '@/util';

interface Props {
  post: RecommendPost;
}

export const RecommendArticleCard = ({ post }: Props) => {
  return (
    <article className=" py-6 px-5 border-b border-b-gray-20">
      <div className=" flex flex-col gap-3">
        <div className=" flex gap-1.5">
          <div className=" w-full flex flex-col gap-1.5">
            <div className=" text-title-small text-gray-90">{post.title}</div>
            <div className=" flex items-center justify-between">
              <div className=" flex items-center gap-1 text-gray-80 text-body-medium">
                <span>LOST112</span>
                <DotIcon className=" relative top-[1px]" />
                <span>{formatDate(post.createdAt, false)}</span>
              </div>
            </div>
          </div>
          {post?.imageUrl && (
            <div className=" flex items-center justify-center relative w-[50px] min-w-[50px] aspect-square">
              {/* TODO */}
              {/* <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                src={post.imageUrl}
                alt={`${post.title} - ${post.createdAt}`}
                className=" absolute top-0 left-0 w-full h-full object-cover rounded-md"
              /> */}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
