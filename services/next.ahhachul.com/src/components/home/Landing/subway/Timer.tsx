import React, { memo } from 'react';
import { useTimer } from 'react-timer-hook';

import { randomSecond } from '@/src/data/random';

const Timer = ({ expiryTime }: { expiryTime: number }) => {
  const minuteToSecond = expiryTime * randomSecond;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + minuteToSecond);

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire: () => console.warn('onExpire called'),
  });

  if (minutes === 0 && seconds < 30) return <>진입</>;

  return (
    <>
      {minutes === 0 ? '' : `${minutes}분`}
      {seconds === 0 ? '' : `${seconds}초`}
    </>
  );
};

export default memo(Timer);
