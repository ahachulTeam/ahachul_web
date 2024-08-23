import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 8H19V3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.7094 16.3571C17.7775 17.792 16.4102 18.8904 14.8082 19.4909C13.2062 20.0915 11.4538 20.1627 9.80833 19.6939C8.16287 19.2252 6.71103 18.2413 5.66595 16.8867C4.62086 15.5321 4.03759 13.8781 4.00176 12.1675C3.96593 10.457 4.47943 8.78004 5.46687 7.38284C6.45431 5.98564 7.86368 4.94181 9.48806 4.4046C11.1124 3.86738 12.8663 3.86509 14.492 4.39805C16.1178 4.93101 17.5299 5.97114 18.521 7.36575" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconFetch: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconFetch;
