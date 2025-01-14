import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 21C4 18.2386 7.58172 16 12 16C16.4183 16 20 18.2386 20 21" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" stroke="#f0f4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const UserIcon = () => <div css={cssUtils.flex} dangerouslySetInnerHTML={{ __html: SVG }} />;
