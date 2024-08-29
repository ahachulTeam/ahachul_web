import React, { type HTMLAttributes } from 'react';
import { getRandomPhrase } from 'features/users/lib/getRandomPhrase';
import * as styles from './CheerUpPhrasesWithUserName.css';

interface CTAFlowsProps extends HTMLAttributes<HTMLHeadingElement> {}

const phrase = getRandomPhrase();
export const CheerUpPhrasesWithUserName = ({ ...props }: CTAFlowsProps) => {
  let username = '이효범';

  return (
    <h1 css={styles.cheerUpPhrase} {...props}>
      <b>{username}님,</b>
      {phrase}
    </h1>
  );
};
