import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="car">
  <rect width="256" height="256" fill="none"></rect>
  <line
    x1="16"
    x2="240"
    y1="120"
    y2="120"
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
  ></line>
  <path
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
    d="M224 184v24a8 8 0 0 1-8 8H192a8 8 0 0 1-8-8V184M72 184v24a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V184"
  ></path>
  <line
    x1="64"
    x2="80"
    y1="152"
    y2="152"
    fill="none"
    stroke="#c9cedc"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
  ></line>
  <line
    x1="176"
    x2="192"
    y1="152"
    y2="152"
    fill="none"
    stroke="#c9cedc"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
  ></line>
  <path
    fill="none"
    stroke="#c9cedc"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
    d="M224,120,194.11151,52.75089A8,8,0,0,0,186.801,48H69.199a8,8,0,0,0-7.31049,4.75089L32,120v64H224Z"
  ></path>
</svg>
`;

export const 카셰어링Icon = () => (
  <div
    css={cssUtils.flexCenterCenter}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
