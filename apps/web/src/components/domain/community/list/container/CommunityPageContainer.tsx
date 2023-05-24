import { Tab } from '@ahhachul/ui'
import ArticleList from '../articleList/ArticleList'
import HashtagList from '../hashtagList/HashtagList'
import * as S from './styled'
import { COMMUNITY_TABS } from '@/assets/static/tab'
import { StaticSEO } from '@/constants/seo'
import useTab from '@/hooks/useTab'

function CommunityPageContainer() {
  const { selectedTab, handleChangeTab } = useTab(COMMUNITY_TABS)

  return (
    <S.Container>
      <Tab selectedTab={selectedTab} tabList={COMMUNITY_TABS} handleChangeTab={handleChangeTab} />
      <h2 css={S.visuallyHidden}>{StaticSEO.community.title}</h2>
      <S.Divider />
      <S.HashtagSection>
        <h3 css={S.h3}>HOT 해쉬태그</h3>
        <HashtagList />
      </S.HashtagSection>
      <S.Divider />
      <ArticleList />
    </S.Container>
  )
}

export default CommunityPageContainer
