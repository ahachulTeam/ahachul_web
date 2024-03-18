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

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* 버튼 클릭시 나오는 하이라이트 제거 */
    -webkit-touch-callout: none; /* 링크를 오래 눌렀을때 액션 막기*/
    -webkit-user-select: none; /* 글자들 선택 안되게 막기 */
    -khtml-user-select: none; /* 글자들 선택 안되게 막기 */
    -moz-user-select: none; /* 글자들 선택 안되게 막기 */
    -ms-user-select: none; /* 글자들 선택 안되게 막기 */
    user-select: none; /* 글자들 선택 안되게 막기 */
    -webkit-user-drag: none; /* 이미지, 글자 drag 막기*/
  }
`;

export default global;
