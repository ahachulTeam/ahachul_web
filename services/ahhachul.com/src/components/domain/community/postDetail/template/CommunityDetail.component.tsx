import { formatDateTime } from '@ahhachul/utils';

import { CommunityComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useFetchCommunityDetail } from '@/services/community';
import { isLexicalContent } from '@/utils/lexical';

import * as S from './CommunityDetail.styled';

interface CommunityDetailProps {
  id: number;
}

const CommunityDetail = ({ id }: CommunityDetailProps) => {
  const { data: post } = useFetchCommunityDetail(id);

  return (
    <>
      <CommunityComponent.CommunityDetailHeaderActions id={id} createdBy={+post.createdBy} />

      <S.ArticleWrapper>
        <UiComponent.ImageCarousel label={post.title} images={post.images} />
        <S.ContentWrapper>
          <CommunityComponent.CommunityCategoryBadge categoryType={post.categoryType} />
          <S.TitleWrapper>{post.title}</S.TitleWrapper>
          <S.MetaInfoWrapper>
            <S.AuthorDateWrapper>
              <S.AuthorText>{post.writer}</S.AuthorText>
              <S.DateText>{formatDateTime(post.createdAt)}</S.DateText>
            </S.AuthorDateWrapper>
            <S.SubwayLineWrapper>{subwayIconMap.get(post.subwayLineId)}</S.SubwayLineWrapper>
          </S.MetaInfoWrapper>
        </S.ContentWrapper>

        <S.ContentContainer>
          {!isLexicalContent(post.content) ? (
            <S.TextContent>{post.content}</S.TextContent>
          ) : (
            <S.LexicalContent>
              <UiComponent.ReadonlyEditor content={post.content} />
            </S.LexicalContent>
          )}
        </S.ContentContainer>
      </S.ArticleWrapper>

      <CommunityComponent.CommunityCommentList id={id} commentCnt={post.commentCnt} />
    </>
  );
};

export default CommunityDetail;
