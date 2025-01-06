import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { useAuthStore } from 'entities/app-authentications/slice';
import { useGetUserInfo } from 'features/users/api';
import { getDomainName } from 'shared/lib/config/app-env';

const MyPage: ActivityComponentType = () => {
  const {
    dimensions: {
      size: { gutter },
    },
    color: { text },
  } = useTheme();

  const { auth, reset } = useAuthStore();
  const { data: userInfo } = useGetUserInfo(auth);

  const handleLogout = () => {
    window.alert('로그아웃했어요');
    reset();
    setTimeout(() => {
      window.location.assign(getDomainName());
    }, 100);
  };

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
      <button
        type="button"
        css={{
          marginTop: '20px',
          color: text[50],
          fontWeight: 700,
          padding: gutter,
        }}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </Layout>
  );
};

export default MyPage;
