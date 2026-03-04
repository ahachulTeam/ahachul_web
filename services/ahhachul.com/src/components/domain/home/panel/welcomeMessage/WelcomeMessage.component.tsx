import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';

import * as S from './WelcomeMessage.styled';
import { getRandomGreeting } from './WelcomeMessage.util';

const greetingPhrase = getRandomGreeting();

const WelcomeMessage = () => {
  const { authService, isCheckingAuthState } = useAuth();
  const { data: userInfo, isError } = useFetchUserProfile();

  if (isCheckingAuthState) {
    return (
      <S.SkeletonHeading>
        <S.SkeletonBar />
      </S.SkeletonHeading>
    );
  }

  const isAuthenticated = authService.isAuthenticated;
  const displayName =
    isAuthenticated && !isError ? (userInfo?.result?.nickname ?? '아하철') : '아하철';

  const greeting = isAuthenticated ? greetingPhrase : '오늘도 안전한 이동 되세요.';

  return (
    <S.WelcomeMessageHeading>
      <b>{displayName}님,</b>
      {greeting}
    </S.WelcomeMessageHeading>
  );
};

export default WelcomeMessage;
