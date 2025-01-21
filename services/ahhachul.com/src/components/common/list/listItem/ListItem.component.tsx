import { formatDateTime } from '@ahhachul/utils';

import { CommentIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';
import type { Post as TypePost } from '@/types';
import { isLexicalContent } from '@/utils/lexical';

import * as S from './ListItem.styled';

interface PostProps {
  post: TypePost;
}

const Post = ({ post }: PostProps) => {
  return (
    <S.Article>
      <S.Container>
        <S.ContentWrapper>
          <S.TextContainer>
            <S.Title>{post.title}</S.Title>
            {isLexicalContent(post.content) ? (
              <UiComponent.ReadonlyEditor
                content={post.content}
                overrideCss={S.lexicalContentStyle}
              />
            ) : (
              <S.Content>{post.content}</S.Content>
            )}
          </S.TextContainer>
          {post?.imageUrl && (
            <S.ImageContainer>
              <S.PostImage
                width="100%"
                height="100%"
                effect="opacity"
                src={
                  post.image && 'imageUrl' in post.image
                    ? post.image.imageUrl
                    : post.imageUrl || '/placeholder.svg'
                }
                alt={`${post.title} - ${post.createdAt}`}
              />
            </S.ImageContainer>
          )}
        </S.ContentWrapper>
        <S.MetaContainer>
          <S.MetaInfo>
            {subwayIconMap.get(post.subwayLineId)}
            <S.StyledDotIcon />
            <span>{post.writer || '로스트 112'}</span>
            <S.StyledDotIcon />
            <span>{formatDateTime(post.createdAt, { format: 'relative' })}</span>
          </S.MetaInfo>
          <S.CommentContainer>
            <CommentIcon />
            <span>{post.commentCnt}</span>
          </S.CommentContainer>
        </S.MetaContainer>
      </S.Container>
    </S.Article>
  );
};

export default Post;
