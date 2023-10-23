import { Tab, Toggle } from '@ahhachul/ui'
import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { ArrowDownIcon, RefetchIcon } from '@/assets/icons'
import Train from '@/components/public/train/Train'

function SubwayInformation() {
  const dummyUserSelection = {
    one: '1',
    two: '7',
    three: '9',
    all: '전체 노선도',
  }
  const dummuDirections = { HELLO: '잠원방면', WORDL: '교대방면' }
  const [selectedTab, setSelectedTab] = useState('one')
  const [selectedDirection, setSelectedDirection] = useState('HELLO')
  const handleChangeTab = useCallback((line: string) => () => setSelectedTab(line), [])
  const handleChangeDirection = useCallback((direction: string) => () => setSelectedDirection(direction), [])

  return (
    <Container>
      <HeadingTriggerButton>
        오늘의 <b>고속터미널역</b>
        <ArrowDownIcon />
      </HeadingTriggerButton>
      <UserSelectedSubwayLineBox>
        <Tab selectedTab={selectedTab} tabList={dummyUserSelection} handleChangeTab={handleChangeTab} />
      </UserSelectedSubwayLineBox>

      <InfoWrapper>
        <Toggle css={tabs} defaultValue={selectedDirection} tabAriaLabel="방면 탭 버튼">
          <Toggle.WithActionFn tabs={dummuDirections} actionFn={handleChangeDirection} />
        </Toggle>
        <SubwayInfo>
          <ThickBorderArea tabIndex={-1}>
            <StationLabel>아하철역</StationLabel>
            <DirectionLabel>잠원방면</DirectionLabel>
          </ThickBorderArea>
          <ContentArea>
            <TopInfo>
              <b>곧 도착</b>
              <span>대화행</span>
              <button>
                <RefetchIcon />
              </button>
            </TopInfo>
            <TrainInfoContainer>
              <TrainInfoTop>
                <span>전동차 5035</span>
                <div>
                  <span>여유</span>
                  <ul>
                    <li />
                    <li />
                    <li />
                    <li />
                  </ul>
                  <span>혼잡</span>
                  <button>i</button>
                </div>
              </TrainInfoTop>
              <Train />
            </TrainInfoContainer>
            <BottomInfo>
              <li>
                <b>곧 도착</b>
                <span>대화행</span>
              </li>
              <li>
                <b>2분 26초</b>
                <span>대화행</span>
              </li>
              <li>
                <b>10분 28초</b>
                <span>대화행</span>
              </li>
              <li>
                <b>12분 05초</b>
                <span>대화행</span>
              </li>
            </BottomInfo>
            <button css={allTrainsBtnCss}>지하철 전체 시간표</button>
          </ContentArea>
        </SubwayInfo>
      </InfoWrapper>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  padding: 20px 0;
`

const HeadingTriggerButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular20};
    ${theme.common.flexAlignCenter};
    color: ${theme.colors.black};
    padding-left: 16px;
    margin-bottom: 20px;

    & > b {
      ${theme.fonts.bold20};
      margin-left: 6px;
      color: ${theme.colors.primary};
    }

    & > svg > path {
      stroke: ${theme.colors.primary};
    }
  `}
`

const UserSelectedSubwayLineBox = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexAlignCenter};
    padding-right: 28px;
    border-bottom: 1px solid ${theme.colors.gray_22};

    & > ul:first-of-type {
      ${theme.common.flexGrowOne};
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));

      & > li:not(:last-of-type) {
        & > button {
          /* background-color: red; */
        }
      }

      & > li:last-of-type {
        & > button {
          ${theme.fonts.medium14};
          color: ${theme.colors.black};
        }
      }
    }
  `}
`
const InfoWrapper = styled.div`
  padding: 20px 28px 30px 28px;
`

const SubwayInfo = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    min-height: 180px;
    border-bottom: 1px solid #fd8938;
    border-left: 1px solid #fd8938;
    border-right: 1px solid #fd8938;
    border-radius: 20px;
    background-color: ${theme.colors.white};
  `}
`

const ThickBorderArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fd8938;
`

const StationLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    position: absolute;
    top: 50%;
    left: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border: 3px solid #fd8938;
    border-radius: 21px;
    padding: 8px 32px;
    background-color: ${theme.colors.white};
    transform: translateY(-50%);
  `}
`

const DirectionLabel = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    position: absolute;
    top: 50%;
    left: 157px;
    transform: translateY(-50%);
    color: ${theme.colors.white};
  `}
`

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 54px 20px 24px 20px;
`

const TrainInfoContainer = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexColumn};
    row-gap: 4px;

    & > div {
    }
  `}
`

const TrainInfoTop = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexAlignCenter};
    justify-content: space-between;
    width: 100%;

    & > span {
      ${theme.fonts.regular11};
      color: ${theme.colors.gray_35};
    }

    & > div {
      ${theme.common.flexAlignCenter};
      column-gap: 4px;

      & > ul {
        display: grid;
        min-width: 40px;
        grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
        gap: 2px;

        & > li {
          width: 10px;
          height: 10px;
          border-radius: 50%;

          &:first-of-type {
            background-color: #a2d471;
          }

          &:nth-of-type(2) {
            background-color: #ffc44d;
          }

          &:nth-of-type(3) {
            background-color: #ff884d;
          }

          &:last-of-type {
            background-color: #ee4d4d;
          }
        }
      }

      & > span {
        ${theme.fonts.regular11};
        color: ${theme.colors.gray_35};
      }

      & > button {
        ${theme.common.flexCenter};
        ${theme.fonts.regular10};
        width: 10px;
        height: 10px;
        padding: 2px;
        border-radius: 50%;
        position: relative;
        top: 1px;

        color: ${theme.colors.white};
        background-color: ${theme.colors.black};
      }
    }
  `}
`

const TopInfo = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexAlignCenter};
    position: relative;
    margin-bottom: 18px;

    & > b {
      ${theme.fonts.bold16};
      margin-right: 6px;
      color: ${theme.colors.primary};
    }

    & > span {
      ${theme.fonts.regular16};
      color: ${theme.colors.black};
    }

    & > button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);

      & > svg {
        transform: rotate(90deg);
      }
    }
  `}
`

const BottomInfo = styled.ul`
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 24px;
    margin: 16px 0;

    & > li {
      ${theme.common.flexAlignCenter};
      justify-content: space-between;
      width: 100%;
      ${theme.fonts.bold16};

      &:not(:first-of-type) {
        ${theme.fonts.regular16};
        opacity: 0.5;
      }

      & > b {
        color: ${theme.colors.primary};
      }

      & > span {
        color: ${theme.colors.black};
      }
    }
  `}
`

const allTrainsBtnCss = (theme: Theme) => css`
  ${theme.common.flexCenter};
  ${theme.fonts.regular14};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #686868;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #cacaca;
  background: #fff;
`

const tabs = css`
  width: 100%;
  margin-bottom: 28px;
`

export default SubwayInformation
