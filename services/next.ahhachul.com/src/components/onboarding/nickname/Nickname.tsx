import React from 'react';

import { wrap, pageTitle, title, subTitle } from './style';
import useNickname from './useNickname';

interface Props {
  nickname: string;
  handleNickName: (nickname: string) => void;
  handleNext: () => void;
}

function Nickname({ nickname, handleNickName, handleNext }: Props) {
  const { inputRef, invalidMsg, disabled, next } = useNickname({ nickname, handleNext });

  return (
    <section css={wrap}>
      <h1 css={pageTitle}>회원가입</h1>
      <p css={title}>닉네임</p>
      <p css={subTitle}>한글,영문 10자 이하로 입력해주세요</p>
      <input
        ref={inputRef}
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => handleNickName(e.target.value)}
      />
      <p css={(theme) => ({ ...title(theme), margin: '80px 0 30px' })}>{invalidMsg}</p>
      <button disabled={disabled} color="primary" css={{ width: '100%' }} onClick={next}>
        완료
      </button>
    </section>
  );
}

export default Nickname;
