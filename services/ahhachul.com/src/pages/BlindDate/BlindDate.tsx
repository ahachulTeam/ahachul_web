import React from 'react';
import { BlindDateComponent } from 'components';
import { Layout } from 'components/layout';
import { useAppSelector } from 'stores';

const Login: React.FC = () => {
  const { userAcceptedUsingBlindDate } = useAppSelector((state) => state.blindDate);

  return (
    <Layout activeTab={false} isDate>
      {userAcceptedUsingBlindDate ? <BlindDateComponent.Dashboard /> : <BlindDateComponent.Landing />}
    </Layout>
  );
};

export default Login;
