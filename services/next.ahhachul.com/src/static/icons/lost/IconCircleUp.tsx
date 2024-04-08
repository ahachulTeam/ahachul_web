import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="white"/>
<path d="M15 11L12 8M12 8L9 11M12 8L12 16" stroke="#2ACF6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconCircleUp: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconCircleUp;
