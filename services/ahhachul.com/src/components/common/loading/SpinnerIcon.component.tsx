import React from 'react';

import { SpinnerIcon as SpinnerSvgIcon } from '@/assets/icons/system';

interface SpinnerIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const SpinnerIcon: React.FC<SpinnerIconProps> = ({ size = 14, className, ...props }) => {
  return <SpinnerSvgIcon width={size} height={size} className={className} {...props} />;
};

export default SpinnerIcon;
