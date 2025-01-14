import cssUtils from 'shared/utils.css';

const SVG = `
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.409 1.84131C17.7743 1.09279 18.841 1.09279 19.2063 1.84131L21.1583 5.84063C21.3944 6.32455 21.9714 6.53456 22.4634 6.31569L26.5249 4.50886C27.2855 4.17052 28.1023 4.85527 27.902 5.66322L26.8294 9.9887C26.6999 10.5106 27.0064 11.0414 27.5231 11.1903L31.7989 12.4225C32.5981 12.6528 32.7832 13.7014 32.1111 14.1914L28.5123 16.8152C28.078 17.1318 27.9717 17.735 28.2715 18.1811L30.7574 21.8796C31.2215 22.5702 30.6885 23.4925 29.8585 23.4351L25.4226 23.1284C24.8857 23.0913 24.4158 23.4856 24.3591 24.0208L23.8903 28.4501C23.8027 29.2782 22.8004 29.6427 22.2013 29.0642L19.0023 25.9756C18.6148 25.6015 18.0006 25.6015 17.6131 25.9756L14.414 29.0642C13.8149 29.6427 12.8127 29.2782 12.725 28.4501L12.2562 24.0208C12.1996 23.4856 11.7296 23.0913 11.1928 23.1284L6.75687 23.4351C5.92682 23.4925 5.39381 22.5702 5.85795 21.8796L8.34386 18.1811C8.64365 17.735 8.53729 17.1318 8.10303 16.8152L4.50425 14.1914C3.83213 13.7014 4.01721 12.6528 4.81647 12.4225L9.09228 11.1903C9.60895 11.0414 9.91539 10.5106 9.78597 9.9887L8.71335 5.66322C8.51299 4.85527 9.32984 4.17052 10.0904 4.50886L14.1519 6.31569C14.6439 6.53456 15.2209 6.32455 15.4571 5.84063L17.409 1.84131Z" fill="#2EE477"/>
<g clip-path="url(#clip0_5089_12562)">
<path d="M20.5185 12.5292C20.9813 13.0403 20.9223 13.8464 20.3866 14.3331L16.9963 17.4128L15.3229 15.5648L18.7132 12.4851C19.249 11.9984 20.0558 12.0181 20.5185 12.5292ZM15.2346 10.593C15.7703 10.1063 16.5771 10.126 17.0399 10.6371C17.5027 11.1482 17.4437 11.9543 16.9079 12.441L14.4863 14.6408L12.8129 12.7927L15.2346 10.593ZM20.2546 16.137C20.7904 15.6503 21.5971 15.67 22.0599 16.1811C22.5227 16.6922 22.4637 17.4983 21.9279 17.985L19.0219 20.6247C18.4861 21.1114 17.6794 21.0917 17.2166 20.5806C16.7538 20.0695 16.8128 19.2634 17.3486 18.7767L20.2546 16.137ZM20.8273 20.6688C21.363 20.1821 22.1698 20.2018 22.6326 20.7129C23.0954 21.224 23.0364 22.0301 22.5006 22.5168L20.5633 24.2766C20.0275 24.7633 19.2207 24.7436 18.758 24.2325C18.2952 23.7215 18.3542 22.9153 18.8899 22.4286L20.8273 20.6688ZM15.6534 20.3166L15.6716 20.3001C15.7539 20.72 15.942 21.1227 16.2479 21.4605C16.5931 21.8417 17.0331 22.084 17.5057 22.1915C16.9794 23.1274 17.0598 24.3068 17.7893 25.1124C18.0952 25.4503 18.474 25.6798 18.8863 25.8L18.626 26.0364C17.0428 27.4745 14.979 28.0284 13.078 27.7081L10.172 30.3478C9.63624 30.8345 8.82949 30.8148 8.36671 30.3037L4.18337 25.6837C3.72059 25.1726 3.77957 24.3664 4.31536 23.8797L6.68857 21.724C6.47538 21.0072 6.38961 20.2484 6.44612 19.4761L6.49396 18.8222C6.59296 17.4692 7.22681 16.183 8.25298 15.2509L9.07028 14.5085C10.1388 13.5378 11.758 13.5774 12.6809 14.5967L14.9818 17.1377C15.5596 17.7758 15.4858 18.7849 14.8168 19.3925C14.1478 20.0002 13.1379 19.9756 12.5601 19.3374L11.096 17.7204C10.8659 17.4663 10.4597 17.4564 10.1933 17.6984C9.92691 17.9403 9.89722 18.3462 10.1273 18.6003L11.5915 20.2173C12.6321 21.3666 14.4487 21.4109 15.6534 20.3166Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_5089_12562">
<rect width="17.4512" height="20.9382" fill="white" transform="matrix(0.671206 0.741271 -0.740204 0.672383 15.4985 6.98535)"/>
</clipPath>
</defs>
</svg>
`;

export const 폭력Icon = () => (
  <div css={[cssUtils.flex]} dangerouslySetInnerHTML={{ __html: SVG }} />
);
