import React from 'react';
import { f } from 'styles';

const SVG = `
<svg width="112" height="22" viewBox="0 0 112 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.86006 5.31828C4.01826 4.46735 5.43056 3.95325 6.97877 3.95325C10.8316 3.95325 13.9575 7.07331 13.9575 10.9261C13.9575 14.7789 10.8316 17.9049 6.97877 17.9049C3.12597 17.9049 0 14.7789 0 10.9261V0H2.86006V5.31828ZM2.86596 10.9261C2.86596 13.1952 4.70373 15.0389 6.97877 15.0389C9.24791 15.0389 11.0916 13.2012 11.0916 10.9261C11.0916 8.65698 9.24791 6.81331 6.97877 6.81331C4.70964 6.81331 2.86596 8.65107 2.86596 10.9261ZM108.439 2.88691H111.299V0.00321889H108.439V2.88691ZM22.5595 3.95462C18.7067 3.95462 15.5807 7.08058 15.5807 10.9334C15.5807 14.7862 18.7067 17.9062 22.5595 17.9062C26.4123 17.9062 29.5383 14.7803 29.5383 10.9275C29.5383 7.07467 26.4123 3.95462 22.5595 3.95462ZM22.5595 15.0403C20.2845 15.0403 18.4467 13.1966 18.4467 10.9275C18.4467 8.65243 20.2904 6.81467 22.5595 6.81467C24.8286 6.81467 26.6723 8.65834 26.6723 10.9275C26.6723 13.2025 24.8345 15.0403 22.5595 15.0403ZM45.2205 0H42.3605V5.31828C41.2023 4.46735 39.79 3.95325 38.2477 3.95325C34.3949 3.95325 31.2689 7.07922 31.2689 10.932C31.2689 14.7848 34.389 17.9049 38.2418 17.9049C42.0946 17.9049 45.2205 14.7789 45.2205 10.9261V0ZM38.2418 15.0389C35.9667 15.0389 34.1289 13.1952 34.1289 10.9261C34.1289 8.65107 35.9726 6.81331 38.2418 6.81331C40.5109 6.81331 42.3546 8.65698 42.3546 10.9261C42.3546 13.2012 40.5168 15.0389 38.2418 15.0389ZM76.2394 10.9334C76.2394 7.08059 79.3654 3.95462 83.2182 3.95462C87.071 3.95462 90.197 7.08059 90.197 10.9334C90.197 14.7862 87.071 17.9122 83.2182 17.9122C79.3654 17.9122 76.2394 14.7862 76.2394 10.9334ZM79.1054 10.9275C79.1054 13.1966 80.9432 15.0403 83.2182 15.0403C85.4874 15.0403 87.331 13.2025 87.331 10.9275C87.331 8.65835 85.4933 6.81467 83.2182 6.81467C80.9491 6.81467 79.1054 8.65244 79.1054 10.9275ZM105.774 0H102.914V5.31828C101.756 4.46736 100.343 3.95326 98.8011 3.95326C94.9483 3.95326 91.8224 7.07923 91.8224 10.932C91.8224 14.7848 94.9483 17.9108 98.8011 17.9108C102.654 17.9108 105.78 14.7848 105.78 10.932V0H105.774ZM98.7952 15.0389C96.5202 15.0389 94.6824 13.1953 94.6824 10.9261C94.6824 8.65108 96.5261 6.81331 98.7952 6.81331C101.07 6.81331 102.908 8.65698 102.908 10.9261C102.908 13.2012 101.07 15.0389 98.7952 15.0389ZM111.299 17.507H108.439V4.38268H111.299V17.507ZM71.4051 13.0262C70.6901 14.2316 69.5083 15.053 68.0014 15.053C65.7264 15.053 63.8886 13.2093 63.8886 10.9402C63.8886 8.66516 65.7323 6.8274 68.0014 6.8274C69.5083 6.8274 70.6901 7.64287 71.4051 8.85425H74.6257C73.7334 6.02965 71.1215 3.96734 68.0014 3.96734C64.1487 3.96734 61.0227 7.09331 61.0227 10.9461C61.0227 14.7989 64.1487 17.9249 68.0014 17.9249C71.1215 17.9249 73.7334 15.8626 74.6257 13.038H71.4051V13.0262ZM53.7058 12.4671L57.3813 4.3833H60.6845L52.7248 21.8923H49.4216L52.0866 16.0185L46.922 4.3833H50.1543L53.7058 12.4671Z" fill="#004FEC"/>
</svg>
`;

const IconLogo: React.FC = () => <div css={f.flex} dangerouslySetInnerHTML={{ __html: SVG }} />;

export default IconLogo;
