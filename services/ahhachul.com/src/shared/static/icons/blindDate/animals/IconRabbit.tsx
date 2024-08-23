import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 30.1H30V0.0999998H0V30.1Z" fill="black"/>
</svg>
`;

const IconRabbit: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconRabbit;
