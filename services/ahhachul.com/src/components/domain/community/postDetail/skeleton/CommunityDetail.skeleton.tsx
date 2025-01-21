import { BaseSkeleton } from '@/components/common';

import * as S from './CommunityDetail.skeleton.styled';

const CommunityDetailSkeleton = () => {
  return (
    <>
      <S.ArticleWrapper>
        <S.ContentWrapper>
          {/* LostTypeBadge 스켈레톤 */}
          <BaseSkeleton width={60} height={26} radius={13} />

          {/* 제목 스켈레톤 */}
          <S.TitleWrapper>
            <BaseSkeleton width="50%" height={21} radius={6} />
          </S.TitleWrapper>

          {/* 메타 정보 스켈레톤 */}
          <S.MetaWrapper>
            <S.MetaLeftSection>
              <BaseSkeleton width={80} height={16} radius={6} />
              <BaseSkeleton width={100} height={16} radius={6} />
            </S.MetaLeftSection>
            <S.MetaRightSection>
              <BaseSkeleton width={24} height={24} radius={12} />
            </S.MetaRightSection>
          </S.MetaWrapper>

          {/* 본문 내용 스켈레톤 */}
          <S.ContentSection>
            <BaseSkeleton width="60%" height={21} radius={6} style={{ marginBottom: '2px' }} />
            <BaseSkeleton width="90%" height={21} radius={6} style={{ marginBottom: '2px' }} />
            <BaseSkeleton width="30%" height={21} radius={6} />
          </S.ContentSection>
        </S.ContentWrapper>

        {/* 하단 댓글 카운트 및 북마크 영역 스켈레톤 */}
        <S.BottomSection>
          <S.BottomLeftSection>
            <BaseSkeleton width={60} height={16} radius={6} />
          </S.BottomLeftSection>
          <S.BottomRightSection>
            <BaseSkeleton width={24} height={24} radius={12} />
          </S.BottomRightSection>
        </S.BottomSection>
      </S.ArticleWrapper>

      {/* 댓글 목록 스켈레톤 */}
      <S.CommentsSection>
        {new Array(3).fill('').map((_, idx) => (
          <S.CommentItem key={idx} index={idx}>
            <S.CommentHeader>
              <BaseSkeleton width={50} height={14} radius={6} />
              <BaseSkeleton width={20} height={14} radius={6} />
            </S.CommentHeader>
            <S.CommentContent>
              <BaseSkeleton width={150} height={32} radius={6} />
              <BaseSkeleton width={100} height={14} radius={6} />
            </S.CommentContent>
          </S.CommentItem>
        ))}
      </S.CommentsSection>
    </>
  );
};

export default CommunityDetailSkeleton;
