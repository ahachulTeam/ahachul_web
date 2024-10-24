import React from 'react';
import cssUtils from 'shared/utils.css';

const SVG = `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.78">
<path d="M15.3896 27.8555C22.2932 27.8555 27.8896 22.259 27.8896 15.3555C27.8896 8.45191 22.2932 2.85547 15.3896 2.85547C8.48609 2.85547 2.88965 8.45191 2.88965 15.3555C2.88965 22.259 8.48609 27.8555 15.3896 27.8555Z" fill="#222222"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.588 11.1574C19.9541 11.5235 19.9541 12.1171 19.588 12.4832L12.5169 19.5543C12.1508 19.9204 11.5572 19.9204 11.1911 19.5543C10.825 19.1882 10.825 18.5946 11.1911 18.2285L18.2622 11.1574C18.6283 10.7913 19.2219 10.7913 19.588 11.1574Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1911 11.1574C11.5572 10.7913 12.1508 10.7913 12.5169 11.1574L19.588 18.2285C19.9541 18.5946 19.9541 19.1882 19.588 19.5543C19.2219 19.9204 18.6283 19.9204 18.2622 19.5543L11.1911 12.4832C10.825 12.1171 10.825 11.5235 11.1911 11.1574Z" fill="white"/>
</g>
</svg>
`;

export const CircleCloseIcon = () => (
  <div
    css={[cssUtils.flexCenterCenter]}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);
