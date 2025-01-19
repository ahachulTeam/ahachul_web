import { BaseSkeleton } from '@/components/common';

import * as S from './SearchedList.skeleton.styled';

interface SearchedListSkeletonProps {
  isScale: boolean;
}

const SearchedListSkeleton = ({ isScale }: SearchedListSkeletonProps) => {
  return (
    <S.SectionWrapper isScale={isScale}>
      {new Array(5).fill('').map((_, idx) => (
        <S.ArticleItem key={idx} delay={idx}>
          <S.ContentWrapper>
            <S.TopSection>
              <S.TextSection>
                <BaseSkeleton width={100} height={23} radius={6} />
                <BaseSkeleton width={170} height={21} radius={6} />
              </S.TextSection>
              {/* 이미지 스켈레톤 */}
              <S.ImageSection>
                <BaseSkeleton width={66} height={66} radius={6} />
              </S.ImageSection>
            </S.TopSection>
            <S.BottomSection>
              <S.MetaInfoSection>
                <BaseSkeleton width={24} height={24} radius={12} />
                <S.StyledDotIcon />
                <BaseSkeleton width={60} height={16} radius={6} />
                <S.StyledDotIcon />
                <BaseSkeleton width={80} height={16} radius={6} />
              </S.MetaInfoSection>
              <S.CountSection>
                <BaseSkeleton width={20} height={16} radius={6} />
              </S.CountSection>
            </S.BottomSection>
          </S.ContentWrapper>
        </S.ArticleItem>
      ))}
    </S.SectionWrapper>
  );
};

export default SearchedListSkeleton;
