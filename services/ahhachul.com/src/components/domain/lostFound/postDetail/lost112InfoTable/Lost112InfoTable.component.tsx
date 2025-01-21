import { formatDateTime } from '@ahhachul/utils';

import type { LostFoundPostDetail } from '@/types';

import * as S from './Lost112InfoTable.styled';

interface Props {
  post: LostFoundPostDetail;
}

const Lost112InfoTable = ({ post }: Props) => {
  return (
    <S.TableWrapper>
      <S.ContentWrapper>
        <S.Title>유실물 상세정보</S.Title>

        <S.GridContainer>
          <S.Label>습득일</S.Label>
          <S.Value>{formatDateTime(post.createdAt, { format: 'short' })}</S.Value>

          {post?.storage && (
            <>
              <S.Label>습득장소</S.Label>
              <S.Value>{post.storage}</S.Value>
            </>
          )}

          {post?.categoryName && (
            <>
              <S.Label>물품분류</S.Label>
              <S.Value>{post.categoryName}</S.Value>
            </>
          )}

          {post?.storageNumber && (
            <>
              <S.Label>보관 장소 전화번호</S.Label>
              <S.Value>{post.storageNumber}</S.Value>
            </>
          )}

          {post?.storage && (
            <>
              <S.Label>보관장소</S.Label>
              <S.Value>{post.storage}</S.Value>
            </>
          )}

          {post?.pageUrl && (
            <>
              <S.Label>원본 게시글</S.Label>
              <S.StyledLink href={post.pageUrl} target="_blank" rel="noopener noreferrer">
                바로가기
              </S.StyledLink>
            </>
          )}
        </S.GridContainer>

        <S.StatusWrapper>
          <S.StatusDot />
          <S.StatusText>
            {post.status === 'PROGRESS' ? '현재 보관중 입니다.' : '찾기 완료!'}
          </S.StatusText>
        </S.StatusWrapper>
      </S.ContentWrapper>
    </S.TableWrapper>
  );
};

export default Lost112InfoTable;
