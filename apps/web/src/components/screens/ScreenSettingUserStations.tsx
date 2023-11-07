import { Input } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { throttle } from 'lodash-es'
import { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import PageTemplate from '../public/PageTemplate'
import { WaffleIcon } from '@/assets/icons'
import { subwayStationsAtom } from '@/atoms/train'
import { highlightMatchKeyword } from '@/utils'

const ScreenSettingUserStations = () => {
  const stationInfos = useRecoilValue(subwayStationsAtom)
  const [isUserTyped, setIsUserTyped] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  const [refinedStationFromSearchKeyword, setRefinedStationFromSearchKeyword] = useState<string[]>([])

  const getStationInfo = (station: string) => {
    const filteredStations = Object.keys(stationInfos)?.filter(s => s?.includes(station))
    console.log('filterdStations: ', filteredStations)
    setRefinedStationFromSearchKeyword(filteredStations)
  }

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

  const delayedFoundStationInfo = useRef(
    throttle((searchKeyword: string) => getStationInfo(searchKeyword), 100)
  ).current

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
            // TODO: DnD 사용하기
            <StationBox>
              <Station color={'#60B157'}>
                <b>1</b>
                <span>신도림역</span>
                <DragButton>
                  <WaffleIcon />
                </DragButton>
              </Station>
              <Station color={'#FE8A39'}>
                <b>3</b>
                <span>남부터미널역</span>
                <DragButton>
                  <WaffleIcon />
                </DragButton>
              </Station>
              <Station color={'#D2386E'}>
                <b>8</b>
                <span>장지역</span>
                <DragButton>
                  <WaffleIcon />
                </DragButton>
              </Station>
            </StationBox>
          )}
          {isUserTyped && (
            <SuggestionStationKeywordsContainer>
              {refinedStationFromSearchKeyword?.map((station, idx) => (
                <li key={idx}>
                  <button>{highlightMatchKeyword(searchKeyword, station, textHightCss)}</button>
                </li>
              ))}
            </SuggestionStationKeywordsContainer>
          )}
        </InnerContainer>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  )
}

const InnerContainer = styled.div`
  padding: 16px;
`

const StationBox = styled.div`
  padding: 16px 0;
`

const Station = styled.div<{ color: string }>`
  ${({ theme, color }) => css`
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    border-bottom: 1px solid #ededed;

    & > b {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: ${color};
      color: ${theme.colors.white};
      ${theme.fonts.regular12};
    }

    & > span {
      ${theme.fonts.regular16};
      color: ${theme.colors.black};
    }
  `}
`

const DragButton = styled.button`
  all: unset;
  position: absolute;
  width: max-content;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
`

const SuggestionStationKeywordsContainer = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 16px 0;

    & > li {
      ${theme.fonts.semibold16};
      display: flex;
      align-items: center;
      padding: 16px 0px;
      border-bottom: 1px solid ${theme.colors.gray_30};
    }
  `}
`

const textHightCss = css`
  color: hotpink;
`

export default ScreenSettingUserStations
