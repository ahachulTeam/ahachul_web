import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3850_50088)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.2131 17.9454L13.9099 12.6421L19.2131 7.33884C19.7019 6.85005 19.701 6.05897 19.2131 5.57107C18.7252 5.08316 17.9342 5.08228 17.4454 5.57107L12.1421 10.8744L6.8388 5.57107C6.3509 5.08316 5.55982 5.08228 5.07104 5.57107C4.58225 6.05986 4.58314 6.85093 5.07104 7.33884L10.3743 12.6421L5.07104 17.9454C4.58225 18.4342 4.58314 19.2253 5.07104 19.7132C5.55894 20.2011 6.35001 20.202 6.8388 19.7132L12.1421 14.4099L17.4454 19.7132C17.9333 20.2011 18.7244 20.202 19.2131 19.7132C19.7019 19.2244 19.701 18.4333 19.2131 17.9454Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3850_50088">
<rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`;

const IconClose: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flexCenterCenter]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconClose;
