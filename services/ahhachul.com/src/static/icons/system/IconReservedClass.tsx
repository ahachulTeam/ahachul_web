import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM13.1 6C13.1 5.39249 12.6075 4.9 12 4.9C11.3925 4.9 10.9 5.39249 10.9 6V12.4C10.9 12.7723 11.0883 13.1194 11.4005 13.3223L15.4005 15.9223C15.9099 16.2534 16.5912 16.1089 16.9223 15.5995C17.2534 15.0901 17.1089 14.4088 16.5995 14.0777L13.1 11.803V6Z" fill="#3973FF"/>
</svg>
`;

const IconReservedClass: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconReservedClass;
