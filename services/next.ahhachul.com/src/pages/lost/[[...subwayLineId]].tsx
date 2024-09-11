import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { isEmpty } from 'lodash-es';

import { Layout } from '@/src/components/layout';
import { LostComponent, UiComponent } from '@/src/components';
import { exportLineNameWithSubwayLineId } from '@/src/utils/export';

export default function Lost({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <Layout headerType="search">
      <LostComponent.LostMain />
      <UiComponent.SearchModal>
        <UiComponent.SearchBase />
      </UiComponent.SearchModal>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: string;
  description: string;
}> = async (context) => {
  const params = context.params;
  const defaultImage =
    'https://static.ahhachul.com/images/lost_page_banner.png';

  if (isEmpty(params)) {
    const metaData = {
      title: '지하철 유실물 센터 by 아하철',
      description: '지하철 유실물을 모두 모아 보여드릴게요',
      image: defaultImage,
    };

    return { props: { ...metaData } };
  } else {
    let target = '지하철';
    let subwayInfo = exportLineNameWithSubwayLineId(
      params?.subwayLineId?.[0] as string | undefined,
    );

    if (subwayInfo && subwayInfo !== '기타 호선') {
      target = subwayInfo;
    }

    const metaData = {
      title: `${target} 유실물 센터 by 아하철`,
      description: `${target !== '지하철' ? `지하철 ${target}` : target} 유실물을 모두 모아 보여드릴게요`,
      image: defaultImage,
    };

    return { props: { ...metaData } };
  }
};
