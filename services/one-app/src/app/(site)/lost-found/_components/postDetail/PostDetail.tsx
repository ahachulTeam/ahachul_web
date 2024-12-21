'use client';

import React from 'react';
import { useGetLostFoundDetail } from '../../_lib/get';
import LostTypeBadge from './LostTypeBadge';
import { SUBWAY_LOGO_SVG_LIST } from '@/common/components/Subway/subway-logo-icon-map';
import BookmarkIcon from '@/common/assets/icons/svgs/bookmark.svg';
import EllipsisHorizontalIcon from '@/common/assets/icons/svgs/ellipsis.svg';

type Props = {
  lostId: string;
};

const LostFoundPostDetail = ({ lostId }: Props) => {
  const { data: post } = useGetLostFoundDetail(lostId);

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
              <span className=" text-gray-70">{post.createdAt}</span>
            </div>
            <div className=" flex items-center gap-0.5 text-gray-90 text-label-medium font-regular">
              {SUBWAY_LOGO_SVG_LIST[post.subwayLineId]}
              <span>호선</span>
            </div>
          </div>
          <p className=" py-6 mb-3 text-body-large-semi text-gray-90">
            사당역(4호선)에서는 [23.07.18] [검정색 루이비통 반지갑]을 습득/보관
            하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를
            지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을
            수령하시기 바랍니다. 특이사항 : 없음
          </p>
        </div>
        <div className=" border-t border-t-gray-30 h-[50px] flex items-center justify-between px-5">
          <div className=" flex items-center gap-1 text-gray-80 text-label-medium">
            <span>댓글</span>
            <span>{post.commentCnt}</span>
          </div>
          <BookmarkIcon />
        </div>
      </article>
      <section>
        {/* <CommentCard /> */}
        <div className=" flex flex-col py-4 px-5 bg-gray-10 border-b border-b-gray-20">
          <div className=" flex items-center justify-between pb-2">
            <span className=" text-gray-90 text-[13px]">아라뱃길</span>
            <EllipsisHorizontalIcon />
          </div>
          <div className=" flex flex-col gap-3 pb-5">
            <div className=" text-gray-90 text-body-large-semi">
              사당역(4호선)에서는 [23.07.18] [검정색 루이비통 반지갑]을
              습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는
              서류를 지참하시어 보관중으로 기재되어
            </div>
            <span className=" text-body-small text-gray-70">
              {post.createdAt}
            </span>
          </div>
          <button className=" text-gray-90 text-label-medium w-max">
            답글 달기
          </button>
        </div>
      </section>
    </>
  );
};

export default LostFoundPostDetail;
