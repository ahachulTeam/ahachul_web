import React from 'react';
import { wrapper, logoSection } from './style';

function Header() {
  return (
    <header css={wrapper}>
      <div css={logoSection}>
        <button>Bodycodi</button>
      </div>
      <button>로그인</button>
    </header>
  );
}

export default Header;
