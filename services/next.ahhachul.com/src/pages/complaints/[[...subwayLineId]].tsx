import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { isEmpty } from 'lodash-es';

import { Layout } from '@/src/components/layout';
import { ComplaintsComponent } from '@/src/components';
import { exportLineNameWithSubwayLineId } from '@/src/utils/export';
import complaintsBanner from '@/src/static/img/banners/complaints_page_banner.png';

export default function Complaint({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout headerType="default">
      <ComplaintsComponent.ComplaintsMain />
      <ComplaintsComponent.ComplaintList />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ title: string; description: string }> = async (context) => {
  const params = context.params;

  if (isEmpty(params)) {
    const metaData = {
      title: '지하철 민원 센터 by 아하철',
      description: '지하철 민원을 10초 안에 해결해드릴게요',
      image: complaintsBanner.src,
    };

    return { props: { ...metaData } };
  } else {
    let target = '지하철';
    let subwayInfo = exportLineNameWithSubwayLineId(params?.subwayLineId?.[0] as string | undefined);

    if (subwayInfo && subwayInfo !== '기타 호선') {
      target = subwayInfo;
    }

    const metaData = {
      title: `${target} 민원 센터 by 아하철`,
      description: `${target !== '지하철' ? `지하철 ${target}` : target} 민원을 10초 안에 해결해드릴게요`,
      image: complaintsBanner.src,
    };

    return { props: { ...metaData } };
  }
};
