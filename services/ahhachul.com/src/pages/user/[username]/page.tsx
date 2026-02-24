/* eslint-disable react/prop-types */
import type { ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';

import ProfileOverview from './ProfileOverview';

type WithUsername = {
  username: string;
};

const UserProfilePage: ActivityComponentType<WithUsername> = ({ params }) => {
  return (
    <LayoutComponent.Base>
      <ProfileOverview username={params.username} />
    </LayoutComponent.Base>
  );
};

export default UserProfilePage;
