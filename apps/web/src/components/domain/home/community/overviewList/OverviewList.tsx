import styled from '@emotion/styled'
import { useMemo } from 'react'
import OverviewItem from './overviewItem/OverviewItem'
import { useCommunityQuery } from '@/services'

const OverviewList = () => {
  const { data: communityList } = useCommunityQuery()

  const articles = useMemo(
    () => (communityList ? communityList.pages.flatMap(data => data?.posts) : []),
    [communityList]
  )

  return (
    <Community>
      {articles?.map(data => (
        <OverviewItem key={data.id} data={data} />
      ))}
    </Community>
  )
}

const Community = styled.ul`
  display: flex;
  flex-direction: column;

  & > li:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }
`

export default OverviewList
