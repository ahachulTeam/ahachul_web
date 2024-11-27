import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { useAuthStore } from 'entities/app-authentications/slice';
import { useGetUserInfo } from 'features/users/api';

const MyPage: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  const { auth } = useAuthStore();
  const { data: userInfo } = useGetUserInfo(auth);

  return (
    <Layout appBar={{ title: '마이' }}>
      <p
        css={{
          padding: gutter,
          color: text[50],
          fontWeight: 700,
        }}
      >
        내 닉네임은 {userInfo?.nickname}
      </p>
    </Layout>
  );
};

export default MyPage;
