import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';

import * as S from './WelcomeMessage.styled';
import { getRandomGreeting } from './WelcomeMessage.util';

const WelcomeMessage = () => {
  const { isCheckingAuthState } = useAuth();
  const { data: userInfo, isLoading } = useFetchUserProfile();

  const [greeting, setGreeting] = useState<string>('');

  const displayName = userInfo?.result?.nickname || '아하철';

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 랜덤 문구를 생성합니다.
    setGreeting(getRandomGreeting());
  }, []);

  if (!greeting || isLoading || isCheckingAuthState) return null;

  return (
    <S.WelcomeMessageHeading>
      <b>{displayName}님,</b>
      {greeting}
    </S.WelcomeMessageHeading>
  );
};

export default WelcomeMessage;
