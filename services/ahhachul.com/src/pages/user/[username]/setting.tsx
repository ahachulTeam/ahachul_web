/* eslint-disable react/prop-types */
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import { MY_DARK_COLORS } from '@/components/domain/my/myDesignTokens';

import ProfileOverview from './ProfileOverview';

type WithUsername = {
  username: string;
};

const UserProfileSettingPage: ActivityComponentType<WithUsername> = ({ params }) => {
  return (
    <LayoutComponent.Base backgroundColor={MY_DARK_COLORS.appBackground}>
      <ProfileOverview username={params.username} mode="settings" />
    </LayoutComponent.Base>
  );
};

export default UserProfileSettingPage;
