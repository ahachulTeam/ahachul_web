import type { ComponentProps } from 'react';

import { BaseSkeleton as SharedBaseSkeleton } from '@ahhachul/ui';

type SkeletonProps = ComponentProps<typeof SharedBaseSkeleton>;

const BaseSkeleton = (props: SkeletonProps) => <SharedBaseSkeleton {...props} />;

export default BaseSkeleton;
