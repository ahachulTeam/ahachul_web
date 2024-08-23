import React from 'react';
import { f } from 'shared/style';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M2.5 10.8333C5.5 4.16659 14.5 4.16659 17.5 10.8333" stroke="#E0E2EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14.1665C9.6717 14.1665 9.34661 14.1018 9.04329 13.9762C8.73998 13.8506 8.46438 13.6664 8.23223 13.4343C8.00009 13.2021 7.81594 12.9265 7.6903 12.6232C7.56466 12.3199 7.5 11.9948 7.5 11.6665C7.5 11.3382 7.56466 11.0131 7.6903 10.7098C7.81594 10.4065 8.00009 10.1309 8.23223 9.89874C8.46438 9.66659 8.73998 9.48244 9.04329 9.3568C9.34661 9.23117 9.6717 9.1665 10 9.1665C10.663 9.1665 11.2989 9.4299 11.7678 9.89874C12.2366 10.3676 12.5 11.0035 12.5 11.6665C12.5 12.3295 12.2366 12.9654 11.7678 13.4343C11.2989 13.9031 10.663 14.1665 10 14.1665Z" stroke="#E0E2EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const IconEye: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconEye;
