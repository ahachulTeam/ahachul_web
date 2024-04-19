import { ComplaintsComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';
import { COMPLAINTS_CONTENTS_TYPES } from '@/src/data/complaints';
import { useRouter } from 'next/router';

export default function AskTrainNumber() {
  const { query } = useRouter();

  return (
    <Layout headerType="back" title={(query?.slug as string) || ''} nav={false}>
      <ComplaintsComponent.AskTrainNumber slug={query?.slug as COMPLAINTS_CONTENTS_TYPES} />
    </Layout>
  );
}
