import { Layout } from '@/src/components/layout';

const FormForBlindDate = () => {
  return (
    <Layout appBar={{ title: '' }} activeTab={false} isDate>
      <main css={{ color: '#fff', margin: '26px auto', textAlign: 'center' }}>
        Hello~ this is 소개팅 내 정보 입력 페이지
      </main>
    </Layout>
  );
};

export default FormForBlindDate;
