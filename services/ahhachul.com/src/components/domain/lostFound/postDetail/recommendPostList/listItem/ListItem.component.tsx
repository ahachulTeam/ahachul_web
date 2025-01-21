import { formatDateTime } from '@ahhachul/utils';

import type { RecommendPost as TypeRecommendPost } from '@/types';

import * as S from './ListItem.styled';

interface RecommendPostProps {
  post: TypeRecommendPost;
}

const RecommendPost = ({ post }: RecommendPostProps) => {
  return (
    <S.ArticleWrapper>
      <S.ContentContainer>
        <S.FlexContainer>
          <S.TextContainer>
            <S.Title>{post.title}</S.Title>
            <S.MetaContainer>
              <S.AuthorDateContainer>
                <span>LOST112</span>
                <S.StyledDotIcon />
                <span>{formatDateTime(post.createdAt, { format: 'relative' })}</span>
              </S.AuthorDateContainer>
            </S.MetaContainer>
          </S.TextContainer>
          {post?.imageUrl && (
            <S.ImageContainer>
              <S.StyledLazyImage
                width="100%"
                height="100%"
                effect="opacity"
                src={post.imageUrl || '/placeholder.svg'}
                alt={`${post.title} - ${post.createdAt}`}
              />
            </S.ImageContainer>
          )}
        </S.FlexContainer>
      </S.ContentContainer>
    </S.ArticleWrapper>
  );
};

export default RecommendPost;
