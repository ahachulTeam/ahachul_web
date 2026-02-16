import type { ComponentProps } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps extends Omit<ComponentProps<typeof Skeleton>, 'borderRadius'> {
  radius: number;
}

const BaseSkeleton = ({ radius = 0, ...props }: SkeletonProps) => (
  <Skeleton
    {...props}
    borderRadius={radius}
    baseColor="var(--ah-color-skeleton-base)" // 따뜻한 회색
    highlightColor="var(--ah-color-skeleton-highlight)" // 더 밝은 따뜻한 회색
  />
);

export default BaseSkeleton;
