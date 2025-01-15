import React, { useState, useCallback } from 'react';

import { type ActivityComponentType } from '@stackflow/react';
import { NicknameSetup } from 'features/users';
import { Layout } from 'widgets';

import * as styles from './Page.css';

const BlindDate: ActivityComponentType = () => {
  const [nickname, setNickname] = useState('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value),
    [],
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('nickname', nickname);
  };

  return (
    <Layout appBar={{ title: '소개팅' }}>
      <NicknameSetup
        nickname={nickname}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        css={styles.nicknameSetupLayout}
      />
    </Layout>
  );
};

export default BlindDate;
