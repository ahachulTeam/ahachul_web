import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 20.4999L8 12.4999L16 4.49994" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconBack: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconBack;
