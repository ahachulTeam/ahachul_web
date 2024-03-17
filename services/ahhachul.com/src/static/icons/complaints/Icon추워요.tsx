import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_5089_7398)">
<circle cx="28" cy="28" r="28" fill="#5490F9"/>
</g>
<circle cx="29.2811" cy="25.327" r="2.56209" fill="black"/>
<circle cx="35.1373" cy="25.327" r="2.56209" fill="black"/>
<path d="M19.1667 37.4062C19.1667 35.949 20.4372 34.8037 21.8992 34.9386C24.7417 35.2009 28.8936 35.5261 32.0262 35.5261C35.1597 35.5261 39.313 35.2008 42.1556 34.9384C43.6163 34.8036 44.8857 35.9479 44.8857 37.4039C44.8857 38.8609 43.6161 40.0052 42.1551 39.8691C39.3936 39.6118 35.4089 39.2955 32.3941 39.2843C29.1416 39.2721 24.8188 39.6067 21.896 39.8744C20.4349 40.0082 19.1667 38.8632 19.1667 37.4062Z" fill="white" fill-opacity="0.74" stroke="black"/>
<line x1="23.7417" y1="34.7546" x2="23.7417" y2="40.2448" stroke="black"/>
<line x1="39.4805" y1="34.7546" x2="39.4805" y2="39.8788" stroke="black"/>
<line x1="27.7681" y1="35.1204" x2="27.7681" y2="39.8785" stroke="black"/>
<line x1="31.428" y1="35.1204" x2="31.428" y2="39.5125" stroke="black"/>
<line x1="35.0881" y1="35.1204" x2="35.0881" y2="39.5125" stroke="black"/>
<defs>
<filter id="filter0_i_5089_7398" x="0" y="0" width="60" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4" dy="2"/>
<feGaussianBlur stdDeviation="2.45"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.146917 0 0 0 0 0.408402 0 0 0 0 0.722184 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_5089_7398"/>
</filter>
</defs>
</svg>
`;

const Icon추워요: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default Icon추워요;
