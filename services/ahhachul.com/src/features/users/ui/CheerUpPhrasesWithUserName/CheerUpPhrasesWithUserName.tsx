import React, { useRef } from 'react';
import { getRandomPhrase } from 'features/users/lib/getRandomPhrase';
import * as styles from './CheerUpPhrasesWithUserName.css';

export const CheerUpPhrasesWithUserName = () => {
  let username = '이효범';
  const phrase = useRef(getRandomPhrase());

  return (
    <h1 css={styles.cheerUpPhrase}>
      <b>{username}님,</b>
      {phrase.current}
    </h1>
  );
};
