import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';

import * as S from './WelcomeMessage.styled';
import { getRandomGreeting } from './WelcomeMessage.util';

const greetingPhrase = getRandomGreeting();

const WelcomeMessage = () => {
  const { isCheckingAuthState } = useAuth();
  const { data: userInfo, isLoading } = useFetchUserProfile();

  const displayName = userInfo?.result?.nickname || '아하철';

  if (isLoading || isCheckingAuthState) return null;

  return (
    <S.WelcomeMessageHeading>
      <b>{displayName}님,</b>
      {greetingPhrase}
    </S.WelcomeMessageHeading>
  );
};

export default WelcomeMessage;
