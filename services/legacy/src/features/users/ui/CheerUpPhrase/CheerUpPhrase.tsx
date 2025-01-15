import { type HTMLAttributes } from 'react';

import { useAuthStore } from 'entities/app-authentications/slice';
import { useGetUserInfo } from 'features/users/api';
import { getRandomPhrase } from 'features/users/lib/getRandomPhrase';

import * as styles from './CheerUpPhrase.css';

interface CTAFlowsProps extends HTMLAttributes<HTMLHeadingElement> {}

const phrase = getRandomPhrase();
export const CheerUpPhrase = ({ ...props }: CTAFlowsProps) => {
  const { auth } = useAuthStore();
  const { data: userInfo } = useGetUserInfo(auth);
  const username = userInfo?.nickname || '아하철';

  return (
    <h1 css={styles.cheerUpPhrase} {...props}>
      <b>{username}님,</b>
      {phrase}
    </h1>
  );
};
