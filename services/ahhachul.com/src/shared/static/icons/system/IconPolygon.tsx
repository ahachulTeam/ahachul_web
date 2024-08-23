import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 0.5L9.33013 6.5H0.669873L5 0.5Z" fill="#6E7D9D"/>
</svg>
`;

const IconPolygon: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconPolygon;
