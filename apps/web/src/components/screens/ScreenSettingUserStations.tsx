import { Input } from '@ahhachul/ui'
import styled from '@emotion/styled'
import { throttle } from 'lodash-es'
import { useCallback, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import SuggestionStations from '../domain/setting/user/stations/SuggestionStations'
import UserStations from '../domain/setting/user/stations/UserStations'
import PageTemplate from '../public/PageTemplate'
import { subwayStationsAtom } from '@/atoms/train'
import { Suspense } from '@/libs'

const ScreenSettingUserStations = () => {
  const stationInfos = useRecoilValue(subwayStationsAtom)

  const [isUserTyped, setIsUserTyped] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [refinedStationFromSearchKeyword, setRefinedStationFromSearchKeyword] = useState<string[]>([])

  const getStationInfo = useCallback(
    (station: string) => {
      const filteredStations = Object.keys(stationInfos)?.filter(s => s?.includes(station))
      setRefinedStationFromSearchKeyword(filteredStations)
    },
    [stationInfos]
  )

  const delayedFoundStationInfo = useRef(
    throttle((searchKeyword: string) => getStationInfo(searchKeyword), 100)
  ).current

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value?.length > 0) {
      setIsUserTyped(true)
    } else {
      setIsUserTyped(false)
    }
    setSearchKeyword(value)
    delayedFoundStationInfo(value)
  }

  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        <InnerContainer>
          <Input
            id="stations-input"
            label=""
            value={searchKeyword}
            placeholder="역검색하는인풋이랍니당"
            onChange={searchChange}
          />
          {!isUserTyped && (
            <Suspense fallback={<div />}>
              <UserStations />
            </Suspense>
          )}
          {isUserTyped && (
            <SuggestionStations
              searchKeyword={searchKeyword}
              refinedStationFromSearchKeyword={refinedStationFromSearchKeyword}
            />
          )}
        </InnerContainer>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  )
}

const InnerContainer = styled.div`
  padding: 16px;
`

export default ScreenSettingUserStations
