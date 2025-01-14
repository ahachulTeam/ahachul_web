import type { ComponentProps } from 'react';
import Skeleton from 'react-loading-skeleton';

import themes from 'shared/themes.css';

interface SkeletonProps extends Omit<ComponentProps<typeof Skeleton>, 'borderRadius'> {
  radius: number;
}
export const BaseSkeleton = ({ radius = 0, ...props }: SkeletonProps) => (
  <Skeleton
    {...props}
    borderRadius={radius}
    baseColor={themes.color.gray[50]}
    highlightColor={themes.color.whiteAlpha[400]}
  />
);
