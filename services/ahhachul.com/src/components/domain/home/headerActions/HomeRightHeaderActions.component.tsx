import { css } from '@emotion/react';

import { BellIcon, TalkIcon } from '@/assets/icons/system';
import type { NavigationLink } from '@/components/common/header/HeaderActions.type';
import { useAuth } from '@/contexts';
import { StackFlow } from '@/stackflow';

import * as S from './HomeHeaderActions.styled';

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    icon: (
      <TalkIcon
        css={css`
          & > path {
            stroke: #ffffff;
          }
        `}
      />
    ),
    authenticatedRoute: 'TalkPage',
    unauthenticatedRoute: 'SignInPage',
  },
  {
    icon: (
      <BellIcon
        css={css`
          & > path {
            stroke: #ffffff;
          }
        `}
      />
    ),
    authenticatedRoute: 'NotificationPage',
    unauthenticatedRoute: 'SignInPage',
  },
] as const;

const HomeHeaderRightActions = () => {
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

export default HomeHeaderRightActions;
