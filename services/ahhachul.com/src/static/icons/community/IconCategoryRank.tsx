import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5773 4.33457C12.6058 3.31074 11.5125 2.40976 10.3219 1.65176C10.2247 1.59335 10.1134 1.5625 10 1.5625C9.8866 1.5625 9.77533 1.59335 9.67812 1.65176C8.4875 2.40976 7.39421 3.31074 6.42266 4.33457C4.26484 6.60019 3.125 9.09941 3.125 11.5627C3.125 13.3861 3.84933 15.1347 5.13864 16.4241C6.42795 17.7134 8.17664 18.4377 10 18.4377C11.8234 18.4377 13.572 17.7134 14.8614 16.4241C16.1507 15.1347 16.875 13.3861 16.875 11.5627C16.875 9.09941 15.7352 6.60019 13.5773 4.33457ZM7.5 14.6877C7.5 12.526 9.26016 10.9939 10 10.4455C10.7406 10.9924 12.5 12.526 12.5 14.6877C12.5 15.3507 12.2366 15.9866 11.7678 16.4555C11.2989 16.9243 10.663 17.1877 10 17.1877C9.33696 17.1877 8.70107 16.9243 8.23223 16.4555C7.76339 15.9866 7.5 15.3507 7.5 14.6877ZM13.4375 15.625C13.5787 15.2253 13.7501 15.1116 13.75 14.6877C13.75 11.2502 10.4617 9.23535 10.3219 9.15176C10.2247 9.09335 10.1134 9.0625 10 9.0625C9.8866 9.0625 9.77533 9.09335 9.67812 9.15176C9.53828 9.23535 6.25 11.2502 6.25 14.6877C6.24994 15.1116 6.32206 15.5325 6.46328 15.9322C5.81123 15.4059 7.23635 16.6883 6.875 15.9322C6.51365 15.1761 7.1875 15.0035 7.1875 14.1655C7.1875 11.4772 6.89473 12.4498 8.23223 11.0405C9.04774 10.1861 9.02461 9.81773 10 9.15176C10.9755 9.81752 10.9524 10.186 11.7678 11.0405C14.1904 13.5944 13.125 14.9397 13.125 16.4241C13.125 17.262 13.7988 14.8689 13.4375 15.625C13.5564 15.2885 13.0762 16.3811 13.4375 15.625Z" fill="white"/>
</svg>
`;

const IconCategoryRank: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconCategoryRank;