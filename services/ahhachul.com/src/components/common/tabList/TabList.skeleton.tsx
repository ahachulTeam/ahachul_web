import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import * as S from './TabList.styled';

interface TabListSkeletonProps {
  count: number;
  width?: number;
  height?: number;
}

const TabListSkeleton = ({ count, width = 68, height = 28 }: TabListSkeletonProps) => {
  return (
    <S.TabListContainer>
      <S.SkeletonTabList>
        {[...Array(count)].map((_, i) => (
          <Skeleton key={i} width={width} height={height} />
        ))}
      </S.SkeletonTabList>
    </S.TabListContainer>
  );
};

export default TabListSkeleton;
