import { css } from '@emotion/react';

import theme from './theme';

const globalStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/pretendard-variable.woff2') format('woff2');
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
  }

  html {
    /* 1rem = 10px */
    font-size: 62.5%;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    border: 0;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html {
    height: -webkit-fill-available;
  }
  body {
    ${theme.typography.fontSize[14]};
    min-height: -webkit-fill-available;
    font-family: Pretendard, system-ui;
    color: ${theme.color.black};
    line-height: 1;
    background-color: ${theme.color.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: overlay;
  }
  body,
  body *,
  body::before,
  body::after,
  body *::before,
  body *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  img {
    vertical-align: middle;
  }
  input,
  textarea {
    outline: 0;
  }
  button {
    border-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    &:disabled {
      cursor: not-allowed;
    }
  }
  abbr[title] {
    cursor: help;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  path {
    pointer-events: none;
  }
  [tabindex]:focus-visible,
  label:focus-visible,
  button:focus-visible,
  a:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(106, 173, 164, 0.65) inset;
  }
  dialog {
    border: 0;
    padding: 0;
    outline: 0;
  }
  li,
  ol,
  ul {
    list-style: none;
  }
  pre {
    font-family: Pretendard, system-ui;
    color: ${theme.color.black};
  }
`;

export default globalStyles;
