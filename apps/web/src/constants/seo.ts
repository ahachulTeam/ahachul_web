import favicon from 'public/favicon.ico'
//TODO: 오픈그래프 이미지 생기면 교체
import ogImage from 'public/favicon.ico'

import type { SEOProps } from '@/libs/SEO'

export const KR_APP_NAME = '아하철'
export const EN_APP_NAME = 'AhHachul'
export const PREFIX = '지하철 플랫폼'

export const StaticSEO = {
  main: {
    sitename: `${KR_APP_NAME} - ${EN_APP_NAME}`,
    title: `지하철을 빠르고 편리하게, ${PREFIX} ${KR_APP_NAME}`,
    subTitle: `지하철을 빠르고 편리하게, ${PREFIX} ${EN_APP_NAME}`,
    description: `지하철의 실시간 정보와 혼잡도를 아하철에서 찾아보세요. 아하철 커뮤니티를 통한 한 발 빠른 지하철 소식, 쾌적하고 편안한 여정을 위한 지하철 민원 서비스, 한 번에 찾아주는 지하철 분실물 보관함 등을 아하철에서 확인할 수 있어요`,
    congestion: `지하철 혼잡도를 빠르고 편리하게, ${PREFIX} ${KR_APP_NAME}`,
    information: `지하철 실시간 정보를 빠르고 편리하게, ${PREFIX} ${KR_APP_NAME}`,
    subwayNews: `지하철 최신 정보는 ${PREFIX} ${KR_APP_NAME}에서`,
    community: `지하철 커뮤니티는 ${PREFIX} ${KR_APP_NAME}에서`,
  },
  onboarding: {
    title: `지하철을 빠르고 편리하게, ${PREFIX} ${KR_APP_NAME}`,
  },
  community: {
    title: `지하철 커뮤니티는 ${PREFIX} ${KR_APP_NAME}에서`,
  },
}

export const TITLE_TEMPLATE = ` | ${StaticSEO.main.sitename}`

export const DEFAULT_SEO_CONFIG: SEOProps = {
  title: StaticSEO.main.title,
  description: StaticSEO.main.description,
  openGraph: {
    type: 'website',
    url: 'https://www.ahhachul.com',
    images: [{ url: ogImage.src, alt: KR_APP_NAME, width: 800, height: 400 }],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0 minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: favicon.src,
    },
  ],
}
