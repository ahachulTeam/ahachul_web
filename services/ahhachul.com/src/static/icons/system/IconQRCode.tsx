import { Interpolation, Theme } from '@emotion/react';
import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6.42857V3.85714C3 3.38376 3.38376 3 3.85714 3H6.42857" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 17.5714V20.1429C3 20.6162 3.38376 21 3.85714 21H6.42857" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 17.5714V20.1429C21 20.6162 20.6162 21 20.1429 21H17.5714" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 6.42857V3.85714C21 3.38376 20.6162 3 20.1429 3H17.5714" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="6" y="6" width="12" height="12" rx="0.857143" fill="white" fill-opacity="0.075"/>
<rect x="2.57153" y="11.1428" width="18.8571" height="1.71429" rx="0.857143" fill="white"/>
</svg>
`;

const IconQRCode: React.FC<{ onClick?: VoidFunction; css?: Interpolation<Theme> }> = ({ onClick, css }) => (
  <div css={[f.flex, css]} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconQRCode;
