import { ComplaintsComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';
import { COMPLAINTS_CONTENTS_TYPES } from '@/src/data/complaints';
import withAuth from '@/src/hooks/withAuth';
import { useRouter } from 'next/router';

function AskTrainNumber() {
  const { query } = useRouter();

  return (
    <Layout headerType="back" title={(query?.slug as string) || ''} nav={false}>
      <ComplaintsComponent.AskTrainNumber slug={query?.slug as COMPLAINTS_CONTENTS_TYPES} />
    </Layout>
  );
}

export default withAuth(AskTrainNumber);
