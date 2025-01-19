<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> main
import Link from 'next/link';

import { formatDate } from '@/common/utils';
import type { LostFoundPostDetail } from '@/model';

interface Props {
  post: LostFoundPostDetail;
}

export const Lost112ArticleTable = ({ post }: Props) => {
  return (
    <div className="max-w bg-gray-20 px-5 py-4">
      <div className="bg-gray-0 rounded-lg px-5 py-4">
        <h2 className="text-gray-80 text-label-medium pb-4 border-b border-b-gray-20">
          유실물 상세정보
        </h2>

        <div className="grid grid-cols-[120px,1fr] gap-y-4 text-sm py-3 px-[5px]">
          <div className="text-gray-80 text-label-medium">습득일</div>
<<<<<<< HEAD
          <div className="text-gray-90 text-label-medium">{formatDate(post.createdAt)}</div>
=======
          <div className="text-gray-90 text-label-medium">
            {formatDate(post.createdAt)}
          </div>
>>>>>>> main

          {post?.storage && (
            <>
              <div className="text-gray-80 text-label-medium">습득장소</div>
<<<<<<< HEAD
              <div className="text-gray-90 text-label-medium">{post.storage}</div>
=======
              <div className="text-gray-90 text-label-medium">
                {post.storage}
              </div>
>>>>>>> main
            </>
          )}

          {post?.categoryName && (
            <>
              <div className="text-gray-80 text-label-medium">물품분류</div>
<<<<<<< HEAD
              <div className="text-gray-90 text-label-medium">{post.categoryName}</div>
=======
              <div className="text-gray-90 text-label-medium">
                {post.categoryName}
              </div>
>>>>>>> main
            </>
          )}

          {post?.storageNumber && (
            <>
<<<<<<< HEAD
              <div className="text-gray-80 text-label-medium">보관 장소 전화번호</div>
              <div className="text-gray-90 text-label-medium">{post.storageNumber}</div>
=======
              <div className="text-gray-80 text-label-medium">
                보관 장소 전화번호
              </div>
              <div className="text-gray-90 text-label-medium">
                {post.storageNumber}
              </div>
>>>>>>> main
            </>
          )}

          {post?.storage && (
            <>
              <div className="text-gray-80 text-label-medium">보관장소</div>
<<<<<<< HEAD
              <div className="text-gray-90 text-label-medium">{post.storage}</div>
=======
              <div className="text-gray-90 text-label-medium">
                {post.storage}
              </div>
>>>>>>> main
            </>
          )}

          {post?.pageUrl && (
            <>
              <div className="text-gray-80 text-label-medium">원본 게시글</div>
              <Link
                href={post.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-label-medium"
              >
                바로가기
              </Link>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-green-600 justify-center">
          <div className="w-2 h-2 rounded-full bg-green-600 "></div>
          <span className="text-sm">
            {post.status === 'PROGRESS' ? '현재 보관중 입니다.' : '찾기 완료!'}
          </span>
        </div>
      </div>
    </div>
  );
};
