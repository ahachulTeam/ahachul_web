import React, { type HTMLAttributes } from 'react';

import { useCheckNickname } from 'features/users/lib/useCheckNickname';
import InfoIcon from 'shared/static/icons/info';

import * as styles from './NicknameSetup.css';

interface NicknameSetupProps extends HTMLAttributes<HTMLFormElement> {
  nickname: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const NicknameSetup = ({
  nickname,
  handleChange,
  handleSubmit,
  ...props
}: NicknameSetupProps) => {
  const { disabled, errorMessage } = useCheckNickname({ nickname });

  return (
    <form css={styles.form} onSubmit={handleSubmit} {...props}>
      <div css={styles.inputGroup}>
        <span>닉네임 설정</span>
        <input placeholder="닉네임" onChange={handleChange} aria-invalid={Boolean(errorMessage)} />
        {errorMessage && (
          <p>
            <InfoIcon />
            <span>{errorMessage}</span>
          </p>
        )}
      </div>
      <div css={styles.btnWrap}>
        <button type="submit" disabled={disabled}>
          다음
        </button>
      </div>
    </form>
  );
};
