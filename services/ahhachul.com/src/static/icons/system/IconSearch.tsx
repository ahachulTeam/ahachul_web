import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 10.5L15 15" stroke="#15B295" stroke-width="1.70058" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M7.01163 11.7733C9.6414 11.7733 11.7733 9.6414 11.7733 7.01163C11.7733 4.38185 9.6414 2.25 7.01163 2.25C4.38185 2.25 2.25 4.38185 2.25 7.01163C2.25 9.6414 4.38185 11.7733 7.01163 11.7733Z" stroke="#1753E3" stroke-width="1.70058" stroke-miterlimit="10"/>
</svg>
`;

const IconSearch: React.FC = () => <div css={f.flex} dangerouslySetInnerHTML={{ __html: SVG }} />;

export default IconSearch;
