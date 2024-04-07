import React, { useEffect } from 'react';
import { BlindDateComponent } from 'components';
import { Layout } from 'components/layout';
import { useAppSelector } from 'stores';

const BlindDate: React.FC = () => {
  const { userAcceptedUsingBlindDate } = useAppSelector((state) => state.blindDate);

  useEffect(() => {
    if (!userAcceptedUsingBlindDate) return;
    const themeColor = document?.getElementById('theme-color');
    if (themeColor) {
      themeColor.setAttribute('content', '#000');
    }
  }, [userAcceptedUsingBlindDate]);

  return (
    <Layout activeTab={false} isDate backgroundColor={userAcceptedUsingBlindDate ? '#000' : undefined}>
      {userAcceptedUsingBlindDate ? <BlindDateComponent.Dashboard /> : <BlindDateComponent.Landing />}
    </Layout>
  );
};

export default BlindDate;
