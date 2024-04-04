import React from 'react';
import { f } from 'styles';

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="rgb(196, 212, 252)" class="w-5 h-5">
  <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413 41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clip-rule="evenodd" />
</svg>
`;

const IconSubmissionView: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div
    css={[f.flex, { position: 'relative', top: '1px' }]}
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: SVG }}
  />
);

export default IconSubmissionView;
