import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 13.5C5 13.5 10 10 10 5.5C10 4.17392 9.47322 2.90215 8.53553 1.96447C7.59785 1.02678 6.32608 0.5 5 0.5C3.67392 0.5 2.40215 1.02678 1.46447 1.96447C0.526784 2.90215 0 4.17392 0 5.5C0 10 5 13.5 5 13.5Z" fill="#B6B6B6"/>
<path d="M4.99998 6.27756C5.78896 6.27756 6.42855 5.63086 6.42855 4.83312C6.42855 4.03537 5.78896 3.38867 4.99998 3.38867C4.211 3.38867 3.57141 4.03537 3.57141 4.83312C3.57141 5.63086 4.211 6.27756 4.99998 6.27756Z" fill="#212121"/>
</svg>
`;

const IconLocation: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconLocation;
