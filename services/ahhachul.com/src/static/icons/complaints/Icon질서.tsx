import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4222 19.2684C10.849 19.2684 11.2582 19.4377 11.5599 19.7392C11.8616 20.0407 12.0311 20.4496 12.0311 20.876C12.0311 21.3024 11.8616 21.7113 11.5599 22.0128C11.2582 22.3142 10.849 22.4836 10.4222 22.4836C9.99554 22.4836 9.58632 22.3142 9.28459 22.0128C8.98287 21.7113 8.81336 21.3024 8.81336 20.876C8.81336 20.4496 8.98287 20.0407 9.28459 19.7392C9.58632 19.4377 9.99554 19.2684 10.4222 19.2684ZM8.00891 9.62266H24.0978V17.6608H8.00891V9.62266ZM21.6845 19.2684C22.1112 19.2684 22.5204 19.4377 22.8221 19.7392C23.1238 20.0407 23.2934 20.4496 23.2934 20.876C23.2934 21.3024 23.1238 21.7113 22.8221 22.0128C22.5204 22.3142 22.1112 22.4836 21.6845 22.4836C21.2578 22.4836 20.8485 22.3142 20.5468 22.0128C20.2451 21.7113 20.0756 21.3024 20.0756 20.876C20.0756 20.4496 20.2451 20.0407 20.5468 19.7392C20.8485 19.4377 21.2578 19.2684 21.6845 19.2684ZM25.7067 20.6831V9.62266C25.7067 5.4107 21.3949 4.7998 16.0534 4.7998C11.2267 4.7998 6.40002 5.39462 6.40002 9.62266V20.6831C6.40002 21.8002 6.84413 22.8715 7.63465 23.6614C8.02608 24.0525 8.49077 24.3628 9.00219 24.5744C9.51361 24.7861 10.0618 24.895 10.6153 24.895L8.81336 26.6956V27.3065H11.5002L13.9135 24.895H18.4667L20.88 27.3065H23.2934V26.6956L21.4753 24.895C23.8082 24.895 25.7067 23.0141 25.7067 20.6831Z" fill="white"/>
<circle cx="10.4" cy="20.8535" r="1.65333" fill="#2ACF6C"/>
<circle cx="21.7067" cy="20.8535" r="1.65333" fill="#2ACF6C"/>
</svg>
`;

const Icon질서: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default Icon질서;
