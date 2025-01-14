import cssUtils from 'shared/utils.css';

const SVG = `
<svg
  width="23"
  height="23"
  viewBox="0 0 23 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.5 20.125C16.2635 20.125 20.125 16.2635 20.125 11.5C20.125 6.73654 16.2635 2.875 11.5 2.875C6.73654 2.875 2.875 6.73654 2.875 11.5C2.875 16.2635 6.73654 20.125 11.5 20.125Z"
    fill="#6FDA74"
  />
  <path
    d="M14.375 9.58333L10.5417 13.4167L8.625 11.5"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
`;

export const RecommendIcon = () => (
  <div css={[cssUtils.flex]} dangerouslySetInnerHTML={{ __html: SVG }} />
);
