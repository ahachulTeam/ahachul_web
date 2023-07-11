import { Tab } from '@ahhachul/ui'
import ArticleList from '../articleList/ArticleList'
import { FilterList } from '../filterList'
import HashtagList from '../hashtagList/HashtagList'
import * as S from './styled'
import { COMMUNITY_TABS } from '@/assets/static/tab'
import { StaticSEO } from '@/constants/seo'
import useTab from '@/hooks/useTab'

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
        <HashtagList />
        <FilterList />
      </S.TopFilterSection>
      <span css={S.dividerCss} />
      <ArticleList />
    </S.Container>
  )
}
