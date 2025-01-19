import { useAuth } from '@/contexts';
import { StackFlow } from '@/stackflow';

import { NAVIGATION_LINKS } from './HeaderActions.constant';
import * as S from './HeaderActions.styled';

const HeaderActions = () => {
  const {
    authService: { isAuthenticated },
  } = useAuth();

  return (
    <S.Container>
      {NAVIGATION_LINKS.map(({ authenticatedRoute, unauthenticatedRoute, icon }) => (
        <StackFlow.Link
          key={authenticatedRoute}
          activityName={isAuthenticated ? authenticatedRoute : unauthenticatedRoute}
          activityParams={{}}
          css={S.navigationButtonStyle}
        >
          {icon}
        </StackFlow.Link>
      ))}
    </S.Container>
  );
};

export default HeaderActions;
