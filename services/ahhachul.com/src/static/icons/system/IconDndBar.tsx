import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { f } from 'styles';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#c9cedc" class="w-6 h-6">
  <path fill-rule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
</svg>
`;

const IconDndBar: React.FC<{ onClick?: VoidFunction; css?: Interpolation<Theme> }> = ({ onClick, css }) => (
  <div css={[f.flex, css]} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconDndBar;
