import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="62" height="56" viewBox="0 0 62 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_5089_7982)">
<path d="M56.25 28C56.25 43.464 43.714 56 28.25 56C12.786 56 0.25 43.464 0.25 28C0.25 12.536 12.786 0 28.25 0C43.714 0 56.25 12.536 56.25 28Z" fill="#2EE477"/>
<circle cx="24.773" cy="21.5943" r="2.56209" fill="#242424"/>
<circle cx="30.629" cy="21.5943" r="2.56209" fill="#242424"/>
</g>
<path d="M61.75 26.1925C61.75 25.8443 61.6689 25.5012 61.5136 25.1914C61.3582 24.8817 61.133 24.6143 60.8566 24.4113C60.5801 24.2083 60.2604 24.0756 59.9239 24.0241C59.5874 23.9726 59.2438 24.0039 58.9214 24.1153L43.2071 29.5458C42.7827 29.6925 42.4138 29.9716 42.1525 30.3439C41.8911 30.7163 41.7503 31.1631 41.75 31.6215V33.9106C41.7501 34.3687 41.8905 34.8152 42.1513 35.1875C42.4121 35.5598 42.7804 35.8392 43.2043 35.9863L46.0357 36.9716V38.6131C46.0354 39.6654 46.4047 40.6826 47.0765 41.4793C47.7482 42.276 48.6775 42.799 49.6947 42.9529C50.712 43.1067 51.7494 42.8812 52.6176 42.3174C53.4859 41.7537 54.1271 40.8893 54.4243 39.882L58.9186 41.4417C59.241 41.5536 59.5848 41.5854 59.9216 41.5342C60.2584 41.4831 60.5784 41.3506 60.8551 41.1477C61.1319 40.9448 61.3574 40.6774 61.5131 40.3675C61.6687 40.0577 61.7499 39.7143 61.75 39.366V26.1925ZM47.4643 37.4657L53.07 39.4127C52.8817 40.0916 52.4598 40.6779 51.8821 41.0633C51.3044 41.4488 50.61 41.6074 49.927 41.51C49.2439 41.4126 48.6184 41.0656 48.1657 40.5332C47.7131 40.0008 47.464 39.3188 47.4643 38.6131V37.4657Z" fill="#171717"/>
<path d="M28.25 37.5C29.4698 37.5 30.4976 37.1894 31.3657 36.7008C33.246 35.6425 33.6219 33.6522 32.926 31.84C32.2256 30.016 30.4741 28.5 28.25 28.5C26.0259 28.5 24.2744 30.016 23.574 31.84C22.8781 33.6522 23.254 35.6425 25.1343 36.7008C26.0024 37.1894 27.0302 37.5 28.25 37.5Z" fill="white" fill-opacity="0.44" stroke="#242424"/>
<defs>
<filter id="filter0_i_5089_7982" x="-2.75" y="-2" width="59" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-3" dy="-2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.136104 0 0 0 0 0.790278 0 0 0 0 0.398492 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_5089_7982"/>
</filter>
</defs>
</svg>
`;

const Icon행선: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default Icon행선;
