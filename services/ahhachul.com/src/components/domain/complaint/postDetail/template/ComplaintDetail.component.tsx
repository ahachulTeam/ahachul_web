import { formatDateTime } from '@ahhachul/utils';

import { ComplaintComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import { useUser } from '@/hooks/domain';
import { useFetchComplaintDetail } from '@/services/complaint';
import { isLexicalContent } from '@/utils/lexical';

import * as S from './ComplaintDetail.styled';

interface ComplaintDetailProps {
  id: number;
}

const ComplaintDetail = ({ id }: ComplaintDetailProps) => {
  const { data: post } = useFetchComplaintDetail(id);

  const { user } = useUser();
  const isArticleAuthor = +post.createdBy === user?.memberId;

  return (
    <>
      <ComplaintComponent.SendComplaintMessage
        id={post.id}
        createdBy={+post.createdBy}
        subwayLineId={post.subwayLineId}
        complaintType={post.complaintType}
        shortContentType={post.shortContentType}
      />
      <ComplaintComponent.ComplaintDetailHeaderActions id={id} createdBy={+post.createdBy} />

      <S.ArticleWrapper>
        <UiComponent.ImageCarousel label={post.title} images={post.images} />
        <S.ContentWrapper>
          <ComplaintComponent.ComplaintCategoryBadge complaintType={post.complaintType} />
          <S.TitleWrapper>{post.title}</S.TitleWrapper>
          <S.MetaInfoWrapper>
            <S.AuthorDateWrapper>
              <S.AuthorText>{post.writer}</S.AuthorText>
              <S.DateText>{formatDateTime(post.createdAt, { format: 'short' })}</S.DateText>
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

      <ComplaintComponent.ComplaintCommentList
        id={id}
        commentCnt={post.commentCnt}
        isArticleAuthor={isArticleAuthor}
      />
      <ComplaintComponent.ComplaintCommentInput id={id} />
      <S.Padding />
    </>
  );
};

export default ComplaintDetail;
