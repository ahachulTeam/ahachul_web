import styled from '@emotion/styled';

import { ChevronIcon } from '@/assets/icons/system';
import { Avatar } from '@/components/common/avatar/Avatar.component';
import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';
import { useFlow } from '@/stackflow';

const UserProfile = () => {
  const { push } = useFlow();
  const { isCheckingAuthState } = useAuth();
  const { data: userInfo, isLoading } = useFetchUserProfile();

  if (isLoading || isCheckingAuthState) return null;

  return (
    <Wrapper onClick={() => push('MyAccountPage', {})}>
      <UserInfo>
        <Avatar src={userInfo?.result?.imageUrl} size={60} />

        <div data-clarity-mask="True">
          <p className="name">{userInfo?.result?.nickname || '아하철'}</p>
          <p className="email">{userInfo?.result?.email}</p>
        </div>
      </UserInfo>

      <ChevronIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0;

  & > svg {
    transform: rotate(270deg);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 12px;
  }

  p.name {
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    color: #26282b;
  }
  p.mobile {
    font-size: 14px;
    line-height: 18px;
    color: #9a9ea8;
    opacity: 0.8;
  }
`;

export default UserProfile;
