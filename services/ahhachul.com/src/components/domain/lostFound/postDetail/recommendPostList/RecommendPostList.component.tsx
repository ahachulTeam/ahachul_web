import { ChevronIcon } from '@/assets/icons/system';
import { RecommendPost as TypeRecommendPost } from '@/types';

import * as S from './RecommendPostList.styled';
import RecommendPost from './listItem/ListItem.component';

interface Props {
  posts: TypeRecommendPost[];
}

const RecommendPostList = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <S.SectionWrapper>
      <S.HeaderWrapper>
        <S.Title>추천 습득물</S.Title>
        <ChevronIcon />
      </S.HeaderWrapper>
      {posts.map(post => (
        <RecommendPost key={post.id} post={post} />
      ))}
    </S.SectionWrapper>
  );
};

export default RecommendPostList;
