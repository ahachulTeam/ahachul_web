import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_5089_7964)">
<circle cx="28" cy="28" r="28" fill="#FF9DC7"/>
</g>
<circle cx="24.523" cy="21.5943" r="2.56209" fill="#242424"/>
<circle cx="30.379" cy="21.5943" r="2.56209" fill="#242424"/>
<path d="M33 28C27.5 32.4171 22.1993 28.1636 22 28" stroke="black" stroke-linecap="round"/>
<path d="M20 39.4191C20 43.0915 23.216 45.0481 25.5696 46.8001C26.4 47.4178 27.2 48 28 48C28.8 48 29.6 47.4185 30.4304 46.7993C32.7848 45.0488 36 43.0915 36 39.4199C36 35.7476 31.6 33.143 28 36.6741C24.4 33.1423 20 35.7468 20 39.4191Z" fill="#EB1F74"/>
<defs>
<filter id="filter0_i_5089_7964" x="-5" y="-3" width="61" height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-5" dy="-3"/>
<feGaussianBlur stdDeviation="4.7"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.402778 0 0 0 0 0.658042 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_5089_7964"/>
</filter>
</defs>
</svg>
`;

const Icon임산부: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default Icon임산부;
