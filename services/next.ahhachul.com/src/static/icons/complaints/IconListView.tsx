import React from 'react';
import { f } from '@/src/styles';

const SVG = `
<svg width="20" height="20" fill="rgb(196, 212, 252)" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#ic_list_grid2_svg__a)" fill="rgb(196, 212, 252)"><path d="M5.833 3.333H4.167a.833.833 0 0 0-.834.834v1.666c0 .46.373.834.834.834h1.666c.46 0 .834-.373.834-.834V4.167a.833.833 0 0 0-.834-.834ZM5.833 13.4H4.167a.833.833 0 0 0-.834.833V15.9c0 .46.373.833.834.833h1.666c.46 0 .834-.373.834-.833v-1.667a.833.833 0 0 0-.834-.833ZM5.833 8.367H4.167a.833.833 0 0 0-.834.833v1.667c0 .46.373.833.834.833h1.666c.46 0 .834-.373.834-.833V9.2a.833.833 0 0 0-.834-.833ZM15.833 3.333H8.6a.833.833 0 0 0-.833.834v1.666c0 .46.373.834.833.834h7.233c.46 0 .834-.373.834-.834V4.167a.833.833 0 0 0-.834-.834ZM15.833 13.4H8.6a.833.833 0 0 0-.833.833V15.9c0 .46.373.833.833.833h7.233c.46 0 .834-.373.834-.833v-1.667a.833.833 0 0 0-.834-.833ZM15.833 8.367H8.6a.833.833 0 0 0-.833.833v1.667c0 .46.373.833.833.833h7.233c.46 0 .834-.373.834-.833V9.2a.833.833 0 0 0-.834-.833Z"></path></g><defs><clipPath id="ic_list_grid2_svg__a"><path fill="rgb(196, 212, 252)" transform="translate(3.333 3.333)" d="M0 0h13.333v13.4H0z"></path></clipPath></defs></svg>
`;

const IconListView: React.FC<{ onClick?: VoidFunction; className?: string }> = ({ onClick, className }) => (
  <div css={[f.flex]} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: SVG }} />
);

export default IconListView;
