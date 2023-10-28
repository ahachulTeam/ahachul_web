import { Tab } from '@ahhachul/ui'
import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { Suspense, useCallback } from 'react'
import CommunityArticleList from '../domain/community/list/articleList/CommunityArticleList'
import CommunityItemSkeleton from '../domain/community/list/articleList/item/CommunityItem.skeleton'
import CommunityController from '../domain/community/list/controller/CommunityController'
import { COMMUNITY_TABS } from '@/assets/static/tab'
import { FloatingButton } from '@/components'
import { useTab } from '@/hooks/global'

const CommunityMainScreen = () => {
  const { router, selectedTab, handleChangeTab } = useTab(COMMUNITY_TABS)
  const pushToArticleGeneratePage = useCallback(() => router.push('/community/generate'), [router])

  return (
    <>
      <Container>
        <Tab
          css={customBorderBottomCss}
          selectedTab={selectedTab}
          tabList={COMMUNITY_TABS}
          handleChangeTab={handleChangeTab}
        />
        <TopFilterSection>
          <CommunityController />
        </TopFilterSection>
        <div css={dividerCss} />
        <Suspense fallback={<CommunityItemSkeleton />}>
          <CommunityArticleList />
        </Suspense>
      </Container>
      <FloatingButton label="글쓰기" onClick={pushToArticleGeneratePage} />
    </>
  )
}

const Container = styled.section`
  width: 100%;
`

const TopFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 13px 20px;
`

const dividerCss = (theme: Theme) => css`
  min-width: 100%;
  height: 8px;
  background-color: ${theme.colors.gray_10};
`

const customBorderBottomCss = css`
  border-bottom: 0.5px solid #e3e3e3;
`

export default CommunityMainScreen
