import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_5089_7384)">
<circle cx="28" cy="28" r="28" fill="#DE464C"/>
</g>
<circle cx="24.523" cy="21.5946" r="2.56209" fill="#242424"/>
<circle cx="30.3791" cy="21.5946" r="2.56209" fill="#242424"/>
<path d="M27.817 30.1467C31.586 30.1467 34.0134 32.3765 35.5248 34.6793C36.2798 35.8296 36.7951 36.9836 37.1216 37.8521C37.2394 38.1653 37.3322 38.4402 37.4025 38.6631H18.2314C18.3018 38.4402 18.3946 38.1653 18.5123 37.8521C18.8388 36.9836 19.3541 35.8296 20.1091 34.6793C21.6205 32.3765 24.048 30.1467 27.817 30.1467Z" fill="white" fill-opacity="0.44" stroke="#242424"/>
<path d="M14.3749 17.1338C14.3749 18.1857 13.5555 19.0385 12.5448 19.0385C11.5341 19.0385 10.7147 18.1857 10.7147 17.1338C10.7147 16.0818 11.8989 14.2206 12.5448 13.5483C13.7289 14.7808 14.3749 16.0818 14.3749 17.1338Z" fill="white"/>
<path d="M9.25074 21.9067C9.25074 22.7483 8.59526 23.4305 7.78668 23.4305C6.97811 23.4305 6.32263 22.7483 6.32263 21.9067C6.32263 21.0651 7.26996 19.5761 7.78668 19.0383C8.73401 20.0243 9.25074 21.0651 9.25074 21.9067Z" fill="white"/>
<defs>
<filter id="filter0_i_5089_7384" x="-5" y="-3" width="61" height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-5" dy="-3"/>
<feGaussianBlur stdDeviation="4.7"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_5089_7384"/>
</filter>
</defs>
</svg>
`;

const Icon더워요: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default Icon더워요;
