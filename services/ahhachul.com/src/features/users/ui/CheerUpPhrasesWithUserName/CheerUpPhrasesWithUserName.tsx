import React, { type HTMLAttributes, useRef } from 'react';
import { getRandomPhrase } from 'features/users/lib/getRandomPhrase';
import * as styles from './CheerUpPhrasesWithUserName.css';

interface CTAFlowsProps extends HTMLAttributes<HTMLHeadingElement> {}
export const CheerUpPhrasesWithUserName = ({ ...props }: CTAFlowsProps) => {
  let username = '이효범';
  const phrase = useRef(getRandomPhrase());

  return (
    <h1 css={styles.cheerUpPhrase} {...props}>
      <b>{username}님,</b>
      {phrase.current}
    </h1>
  );
};
