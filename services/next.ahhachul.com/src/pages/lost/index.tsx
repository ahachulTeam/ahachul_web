import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '@/src/components/layout';
import { LostComponent, UiComponent } from '@/src/components';
import { exportLineNameWithSubwayLineId } from '@/src/utils/export';

export default function Lost({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout headerType="search">
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ title: string; description: string }> = async (context) => {
  let target = '지하철';
  let subwayInfo = exportLineNameWithSubwayLineId(context.query?.subwayLineId as string | undefined);

  if (subwayInfo && subwayInfo !== '기타 호선') {
    target = subwayInfo;
  }

  const metaData = {
    title: `${target} 유실물 센터 by 아하철`,
    description: `${target !== '지하철' ? `지하철 ${target}` : target} 유실물을 모두 모아 보여드릴게요`,
  };

  return { props: { ...metaData } };
};
