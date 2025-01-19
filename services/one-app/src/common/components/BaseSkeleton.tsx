import type { ComponentProps } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps extends Omit<ComponentProps<typeof Skeleton>, 'borderRadius'> {
  radius: number;
}

export const BaseSkeleton = ({ radius = 0, ...props }: SkeletonProps) => (
  <Skeleton
    {...props}
    borderRadius={radius}
    baseColor="#F5F5F4" // 따뜻한 회색
    highlightColor="#FAFAF9" // 더 밝은 따뜻한 회색
  />
);
