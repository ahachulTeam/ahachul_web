import { Tab } from '@ahhachul/ui'
import ArticleList from '../articleList/ArticleList'
import { FilterList } from '../filterList'
import HashtagList from '../hashtagList/HashtagList'
import * as S from './styled'
import { COMMUNITY_TABS } from '@/assets/static/tab'
import { StaticSEO } from '@/constants/seo'
import { useFilterList } from '@/hooks'
import useTab from '@/hooks/useTab'

export const CommunityPageContainer = () => {
  const { selectedTab, handleChangeTab } = useTab(COMMUNITY_TABS)

  const { filter, handleApplyFilter, handleResetFilter } = useFilterList('sort', 'subwayLineId')

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
        <FilterList filter={filter} handleApplyFilter={handleApplyFilter} />
      </S.TopFilterSection>
      <span css={S.dividerCss} />
      <ArticleList handleResetFilter={handleResetFilter} />
    </S.Container>
  )
}
