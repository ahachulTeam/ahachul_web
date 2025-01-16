import * as S from './HeaderActions.styled';

interface NavigationLink {
  icon: React.ReactNode;
  activityName: string;
}

const HeaderActions = () => {
  const { isAuthenticated } = useAuthStore();

  const navigationLinks: NavigationLink[] = [
    {
      icon: <MessageIcon />,
      activityName: isAuthenticated ? 'TalkPage' : 'LoginPage',
    },
    {
      icon: <ProfileIcon />,
      activityName: isAuthenticated ? 'MyPage' : 'LoginPage',
    },
  ];

  return (
    <S.Container>
      {navigationLinks.map((link, index) => (
        <S.NavigationButton key={index} activityName={link.activityName} activityParams={{}}>
          {link.icon}
        </S.NavigationButton>
      ))}
    </S.Container>
  );
};

export default HeaderActions;
