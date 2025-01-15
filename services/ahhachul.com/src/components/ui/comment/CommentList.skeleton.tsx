import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import * as S from './CommentList.styled';

interface ListSkeletonProps {
  className?: string;
  count: number;
  descCount?: number;
  hasMeta?: boolean;
  hasTags?: boolean;
}

const ListSkeleton = ({
  className,
  count,
  descCount = 3,
  hasMeta: meta = false,
  hasTags: tags = false,
}: ListSkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <S.ListItemSkeleton key={i} css={className}>
          {meta && (
            <S.Metadata isRecommend>
              <Skeleton width={28} height={20} />
            </S.Metadata>
          )}
          <S.ContentSkeleton>
            <S.Title>
              <Skeleton css={S.titleSkeleton} />
            </S.Title>
            <S.DescList>
              {[...Array(descCount)].map((_, i) => (
                <S.Desc key={i}>
                  <Skeleton width={85} />
                </S.Desc>
              ))}
            </S.DescList>
            {tags && (
              <S.TagList>
                <Skeleton width={65} height={28} borderRadius={10} />
                <Skeleton width={65} height={28} borderRadius={10} />
                <Skeleton width={65} height={28} borderRadius={10} />
              </S.TagList>
            )}
          </S.ContentSkeleton>
        </S.ListItemSkeleton>
      ))}
    </>
  );
};

export default ListSkeleton;
