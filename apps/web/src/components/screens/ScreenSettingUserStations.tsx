import { Input } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PageTemplate from '../public/PageTemplate'
import { WaffleIcon } from '@/assets/icons'

const ScreenSettingUserStations = () => {
  return (
    <PageTemplate isPrivatePage>
      <PageTemplate.ContentsSection>
        <InnerContainer>
          <Input
            id=""
            label=""
            value=""
            placeholder=""
            onChange={e => {
              console.log(e)
            }}
          />
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

export default ScreenSettingUserStations
