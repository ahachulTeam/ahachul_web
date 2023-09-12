import { css } from '@emotion/react'
import styled from '@emotion/styled'

function SubwayInformation() {
  return (
    <div>
      <button>오늘의 고속터미널역</button>
      <div>
        <button>3</button>
        <button>7</button>
        <button>9</button>
        <button>전체 노선도</button>
      </div>
      <div>
        <button>잠원방면</button>
        <button>교대방면</button>
      </div>
      <SubwayInfo>
        <ThickBorderArea tabIndex={-1}>
          <AhHachulLabel>아하철역</AhHachulLabel>
        </ThickBorderArea>
        <ContentArea>
          <div>
            <span>곧 도착</span>
            <span>대화행</span>
            <button>reset</button>
          </div>
          <div></div>
          <ul>
            <li>
              <span>곧 도착</span>
              <span>대화행</span>
            </li>
            <li>
              <span>곧 도착</span>
              <span>대화행</span>
            </li>
            <li>
              <span>곧 도착</span>
              <span>대화행</span>
            </li>
            <li>
              <span>곧 도착</span>
              <span>대화행</span>
            </li>
          </ul>
          <button>지하철 전체 시간표</button>
        </ContentArea>
      </SubwayInfo>
    </div>
  )
}

const SubwayInfo = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    min-height: 180px;
    border-bottom: 1px solid ${theme.colors.primary};
    border-left: 1px solid ${theme.colors.primary};
    border-right: 1px solid ${theme.colors.primary};
    border-radius: 20px;
    background-color: ${theme.colors.white};
  `}
`

const ThickBorderArea = styled.div`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 25px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${theme.colors.primary};
  `}
`

const AhHachulLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    position: absolute;
    top: 50%;
    left: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border: 3px solid ${theme.colors.primary};
    border-radius: 21px;
    padding: 8px 32px;
    background-color: ${theme.colors.white};
    transform: translateY(-50%);
  `}
`

const ContentArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 48px 24px 9px;
`

export default SubwayInformation
