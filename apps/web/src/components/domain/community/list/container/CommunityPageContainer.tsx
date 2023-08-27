import { Tab } from '@ahhachul/ui'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import ArticleList from '../articleList/ArticleList'
import Controller from '../controller/Controller'
import * as S from './styled'
import { COMMUNITY_TABS } from '@/assets/static/tab'
import { StaticSEO } from '@/constants/seo'
import useTab from '@/hooks/useTab'

const CommunityItemSkeleton = dynamic(() => import('../articleList/item/CommunityItem.skeleton'), {
  ssr: false,
})

export const CommunityPageContainer = () => {
  const { selectedTab, handleChangeTab } = useTab(COMMUNITY_TABS)

  return (
    <S.Container>
      <Tab
        css={S.customBorderBottomCss}
        selectedTab={selectedTab}
        tabList={COMMUNITY_TABS}
        handleChangeTab={handleChangeTab}
      />
      <h2 css={S.visuallyHidden}>{StaticSEO.community.title}</h2>
      <S.TopFilterSection>
        <Controller />
      </S.TopFilterSection>
      <div css={S.dividerCss} />
      <Suspense fallback={<CommunityItemSkeleton />}>
        <ArticleList />
      </Suspense>
    </S.Container>
  )
}
