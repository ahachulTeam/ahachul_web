import * as S from './CommentList.skeleton.styled';

import { BaseSkeleton } from '../../skeleton';

const CommentListSkeleton = () => {
  return (
    <S.Section>
      {new Array(3).fill('').map((_, idx) => (
        <S.CommentItem key={idx} delay={idx}>
          <S.HeaderWrapper>
            <BaseSkeleton width={50} height={14} radius={6} />
            <BaseSkeleton width={20} height={14} radius={6} />
          </S.HeaderWrapper>
          <S.ContentWrapper>
            <BaseSkeleton width={150} height={32} radius={6} />
            <BaseSkeleton width={100} height={14} radius={6} />
          </S.ContentWrapper>
        </S.CommentItem>
      ))}
    </S.Section>
  );
};

export default CommentListSkeleton;
