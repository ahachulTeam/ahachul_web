import { Interpolation, Theme } from '@emotion/react';
import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1206 2.4242L21.4546 9.80035C21.6262 9.95258 21.7633 10.138 21.8572 10.3447C21.9512 10.5514 21.9998 10.7749 22 11.0009V20.3773C21.9998 20.6714 21.918 20.9599 21.7632 21.2124C21.6083 21.4649 21.3862 21.672 21.1204 21.8117C20.8796 21.9386 20.6095 22.0033 20.3356 21.9999H16C15.4477 21.9999 15 21.5522 15 20.9999V16C15 15.4477 14.5523 15 14 15H10C9.44772 15 9 15.4477 9 16V20.9999C9 21.5522 8.55228 21.9999 8 21.9999H3.66698C3.43069 22.0005 3.197 21.9519 2.98158 21.8574C2.76615 21.7629 2.57396 21.6246 2.41789 21.4519C2.14393 21.1434 1.99533 20.748 2.00011 20.3403V11.0009C2.00031 10.7748 2.04894 10.5513 2.14287 10.3446C2.2368 10.1379 2.37399 9.9525 2.54566 9.8003L10.8782 2.42435C11.1843 2.15143 11.5843 2.00003 11.9994 2C12.4144 1.99997 12.8144 2.15132 13.1206 2.4242Z" fill="#B2BFD1"/>
</svg>
`;

const IconMenuHome: React.FC<{ onClick?: VoidFunction; css?: Interpolation<Theme> }> = ({ onClick, css }) => (
  <div css={[f.flex, css]} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconMenuHome;
