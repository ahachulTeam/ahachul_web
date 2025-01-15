import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { Button } from '@allwagelab/react'

interface SuccessViewProp {
  name: string
  onComplete: () => void
}

const SuccessView = ({ name, onComplete }: SuccessViewProp) => {
  return (
    <SuccessContainer>
      <SuccessContent>
        <SuccessIcon>
          <img src="/icons/check.svg" alt="complete" />
        </SuccessIcon>
        <SuccessTitle>회원 가입 완료!</SuccessTitle>
        <SuccessMessage>{name}님, 환영해요</SuccessMessage>
      </SuccessContent>
      <Button full onClick={onComplete}>
        올웨이지 시작하기
      </Button>
    </SuccessContainer>
  )
}

export default SuccessView

const SuccessContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SuccessContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SuccessIcon = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.blue60};
  `}
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: white;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 27px;
`

const SuccessTitle = styled.p`
  ${({ theme }) => css`
    ${theme.typography.title.t5_rg}
    color: ${theme.colors.blue60};
  `}
`

const SuccessMessage = styled.p`
  ${({ theme }) => css`
    ${theme.typography.title.t2_rg}
  `}
`
