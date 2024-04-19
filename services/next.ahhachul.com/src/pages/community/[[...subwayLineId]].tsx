import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { isEmpty } from 'lodash-es';

import { Layout } from '@/src/components/layout';
import { CommunityComponent, UiComponent } from '@/src/components';
import { exportBannerImageWidthLineId, exportLineNameWithSubwayLineId } from '@/src/utils/export';
import communityBanner from '@/src/static/img/banners/community_page_banner.png';

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
      image: communityBanner.src,
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
      image: exportBannerImageWidthLineId(params?.subwayLineId?.[0] as string),
    };

    return { props: { ...metaData } };
  }
};
