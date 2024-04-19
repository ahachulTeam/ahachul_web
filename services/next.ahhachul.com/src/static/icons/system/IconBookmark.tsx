import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="26" height="26" rx="13" fill="none"/>
<path d="M17.1667 6H8.83333C8.3731 6 8 6.36584 8 6.81713V19.1815C8 19.8341 8.74179 20.2234 9.29558 19.8614L12.5377 17.742C12.8177 17.559 13.1823 17.559 13.4622 17.742L16.7044 19.8614C17.2582 20.2234 18 19.8341 18 19.1815V6.81713C18 6.36584 17.6269 6 17.1667 6Z" fill="#BEC1CB"/>
</svg>
`;

const IconBookmark: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconBookmark;
