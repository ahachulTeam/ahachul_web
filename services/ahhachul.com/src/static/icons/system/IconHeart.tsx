import React from 'react';
import { f } from 'styles';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <rect width="20" height="20" fill="none"/>
  <path d="M16.1431 9.90921L9.99992 16.6667L3.85678 9.90921C2.63067 8.5605 2.68003 6.48656 3.96889 5.19769C5.40799 3.75859 7.77849 3.88988 9.04987 5.4791L9.99992 6.66667L10.95 5.4791C12.2213 3.88988 14.5918 3.75859 16.0309 5.19769C17.3198 6.48656 17.3692 8.5605 16.1431 9.90921Z" fill="#E0E2EB"/>
</svg>
`;

const IconHeart: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconHeart;
