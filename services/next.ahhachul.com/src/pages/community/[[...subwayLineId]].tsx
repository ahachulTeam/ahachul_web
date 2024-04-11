import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '@/src/components/layout';
import { CommunityComponent, UiComponent } from '@/src/components';
import { exportLineNameWithSubwayLineId } from '@/src/utils/export';
import { isEmpty } from 'lodash-es';

export default function Community({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout headerType="search">
      <CommunityComponent.CommunityMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ title: string; description: string }> = async (context) => {
  const params = context.params;

  if (isEmpty(params)) {
    const metaData = {
      title: '지하철 커뮤니티 by 아하철',
      description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
    };

    return { props: { ...metaData } };
  } else {
    let target = '지하철';
    let subwayInfo = exportLineNameWithSubwayLineId(params?.subwayLineId?.[0] as string | undefined);

    if (subwayInfo && subwayInfo !== '기타 호선') {
      target = subwayInfo;
    }

    const metaData = {
      title: `${target} 커뮤니티 by 아하철`,
      description: `${target !== '지하철' ? `지하철 ${target}` : target}에 당신의 따뜻한 이야기를 채워나가요`,
    };

    return { props: { ...metaData } };
  }
};
