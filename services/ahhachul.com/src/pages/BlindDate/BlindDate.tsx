import React from 'react';
import { BlindDateComponent, UiComponent } from 'components';
import { Layout } from 'components/layout';
import { useAppSelector } from 'stores';

const Login: React.FC = () => {
  const { auth } = useAppSelector((state) => state.auth);

  return (
    <Layout activeTab={false} isDate>
      {auth?.token.accessToken ? (
        <>
          <BlindDateComponent.Dashboard />
          <UiComponent.Footer />
        </>
      ) : (
        <BlindDateComponent.Landing />
      )}
    </Layout>
  );
};

export default Login;
