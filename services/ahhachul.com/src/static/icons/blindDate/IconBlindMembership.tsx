import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="36" height="36" fill="url(#pattern0_5319_12034)"/>
<defs>
<pattern id="pattern0_5319_12034" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_5319_12034" transform="scale(0.000666667)"/>
</pattern>
</defs>
</svg>
`;

const IconBlindMembership: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconBlindMembership;