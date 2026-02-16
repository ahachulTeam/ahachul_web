'use client';

import type { ComponentProps } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { colors } from '@ahhachul/design-system';

interface SkeletonProps extends Omit<ComponentProps<typeof Skeleton>, 'borderRadius'> {
  radius: number;
}

export const BaseSkeleton = ({ radius = 0, ...props }: SkeletonProps) => (
  <Skeleton
    {...props}
    borderRadius={radius}
    baseColor={colors.skeleton.base}
    highlightColor={colors.skeleton.highlight}
  />
);
