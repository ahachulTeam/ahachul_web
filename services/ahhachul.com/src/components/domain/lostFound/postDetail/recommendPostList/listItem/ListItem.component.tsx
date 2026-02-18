import { formatDisplayDate } from '@ahhachul/utils';

import { StackFlow } from '@/stackflow';
import type { RecommendPost as TypeRecommendPost } from '@/types';

import * as S from './ListItem.styled';

interface RecommendPostProps {
  post: TypeRecommendPost;
}

const RecommendPost = ({ post }: RecommendPostProps) => {
  return (
    <StackFlow.Link activityName="LostFoundDetailPage" activityParams={{ id: post.id }}>
      <S.ArticleWrapper>
        <S.ContentContainer>
          <S.FlexContainer>
            <S.TextContainer>
              <S.Title>{post.title}</S.Title>
              <S.MetaContainer>
                <S.AuthorDateContainer>
                  <span>LOST112</span>
                  <S.StyledDotIcon />
                  <span>{formatDisplayDate(post.createdAt, { format: 'relative' })}</span>
                </S.AuthorDateContainer>
              </S.MetaContainer>
            </S.TextContainer>
            {post?.imageUrl && (
              <S.ImageContainer>
                <S.StyledLazyImage
                  width="100%"
                  height="100%"
                  effect="opacity"
                  src={post.imageUrl}
                  alt={`${post.title} - ${post.createdAt}`}
                />
              </S.ImageContainer>
            )}
          </S.FlexContainer>
        </S.ContentContainer>
      </S.ArticleWrapper>
    </StackFlow.Link>
  );
};

export default RecommendPost;
