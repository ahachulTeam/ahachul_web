import { css } from '@emotion/react';
import reset from './reset';

const global = css`
  ${reset.styles}
  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }
  pre {
    font-family: Pretendard, system-ui;
  }
  hr {
    height: 0;
    margin: 0;
    background: unset;
  }
`;

export default global;
