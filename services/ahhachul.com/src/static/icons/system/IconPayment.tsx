import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_4797_25274)">
<path d="M42.3862 21C42.3862 32.598 33.0096 42 21.4431 42C9.87654 42 0.5 32.598 0.5 21C0.5 9.40202 9.87654 0 21.4431 0C33.0096 0 42.3862 9.40202 42.3862 21Z" fill="#2EE477"/>
<ellipse cx="18.8424" cy="16.1957" rx="1.91636" ry="1.92157" fill="#242424"/>
<ellipse cx="23.2225" cy="16.1957" rx="1.91636" ry="1.92157" fill="#242424"/>
</g>
<path d="M46.5 19.6444C46.5 19.3832 46.4394 19.1259 46.3231 18.8936C46.2069 18.6613 46.0385 18.4607 45.8317 18.3085C45.625 18.1562 45.3859 18.0567 45.1342 18.0181C44.8825 17.9795 44.6254 18.0029 44.3843 18.0865L32.6305 22.1593C32.3131 22.2694 32.0372 22.4787 31.8417 22.758C31.6462 23.0372 31.5409 23.3723 31.5406 23.7161V25.433C31.5407 25.7765 31.6457 26.1114 31.8408 26.3906C32.0359 26.6699 32.3113 26.8794 32.6284 26.9898L34.7462 27.7287V28.9599C34.746 29.749 35.0222 30.512 35.5247 31.1095C36.0271 31.707 36.7222 32.0992 37.483 32.2146C38.2439 32.33 39.0199 32.1609 39.6693 31.7381C40.3187 31.3153 40.7983 30.667 41.0206 29.9115L44.3822 31.0813C44.6233 31.1652 44.8805 31.189 45.1324 31.1507C45.3843 31.1123 45.6237 31.013 45.8307 30.8608C46.0377 30.7086 46.2064 30.508 46.3228 30.2756C46.4392 30.0433 46.4999 29.7858 46.5 29.5245V19.6444ZM35.8147 28.0992L40.0076 29.5596C39.8668 30.0687 39.5512 30.5084 39.1191 30.7975C38.6871 31.0866 38.1676 31.2056 37.6568 31.1325C37.1459 31.0594 36.678 30.7992 36.3394 30.3999C36.0009 30.0006 35.8145 29.4891 35.8147 28.9599V28.0992Z" fill="black"/>
<path d="M21.4431 28C22.3361 28 23.086 27.7714 23.7189 27.4126C25.0566 26.6543 25.3323 25.2355 24.8268 23.9204C24.3168 22.5935 23.0466 21.5 21.4431 21.5C19.8396 21.5 18.5694 22.5935 18.0594 23.9204C17.5538 25.2355 17.8296 26.6543 19.1673 27.4126C19.8002 27.7714 20.55 28 21.4431 28Z" fill="white" fill-opacity="0.44" stroke="#242424"/>
<defs>
<filter id="filter0_i_4797_25274" x="-2.5" y="-2" width="44.8862" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-3" dy="-2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.136104 0 0 0 0 0.790278 0 0 0 0 0.398492 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_4797_25274"/>
</filter>
</defs>
</svg>
`;

const IconPayment: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={f.flex} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconPayment;
