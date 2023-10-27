import { FullHeight, Button } from '@ahhachul/ui'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import { Stagger } from '@/components/common'
import { useToast } from '@/hooks/global'
import { useMyProfileMutation, useVerifyNickname } from '@/services'

const SettingNicknameScreen = () => {
  const [checkCnt, setCheckCnt] = useState(0)
  const [nickname, setNickname] = useState<string>('')
  const [nicknameStatus, setNicknameStatus] = useState<boolean | undefined>(undefined)

  const { data: isNicknameSuccess, isLoading, mutate: verifyNicknameMutate } = useVerifyNickname()
  const { mutate: updateMyProfileMutate } = useMyProfileMutation()

  const { success } = useToast()

  const handleVerifyNickname = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname) {
      return success('닉네임을 1자 이상으로 설정하세요')
    }
    setCheckCnt(cnt => cnt + 1)
    verifyNicknameMutate({ nickname })
  }

  const handleSubmitNickname = () => {
    updateMyProfileMutate({ nickname })
  }

  useEffect(() => {
    !isLoading && setNicknameStatus(isNicknameSuccess?.result?.available as boolean)
  }, [isNicknameSuccess?.result?.available, isLoading])

  return (
    <FullHeight css={containerCss}>
      <Stagger>
        <Title>닉네임을 설정해 주세요</Title>
        <form onSubmit={handleSubmitNickname} css={formCss}>
          <Input
            type="text"
            value={nickname}
            aria-invalid={nicknameStatus}
            aria-errormessage="nickname-duplicated-error-id"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          />
          <FlexGroup>
            <Button
              css={btnCss}
              type="submit"
              size="md"
              label="중복체크"
              variant="primary"
              disabled={Boolean(nickname === '')}
              onClick={handleVerifyNickname}
            />
            {nicknameStatus && (
              <Button
                css={btnCss}
                type="button"
                size="md"
                variant="secondary"
                label="닉네임 제출하기"
                onClick={handleSubmitNickname}
              />
            )}
          </FlexGroup>
        </form>
      </Stagger>

      <FlexGroup>
        {checkCnt > 0 && nicknameStatus === false && nicknameStatus !== null && (
          <Stagger>
            <p style={{ color: 'red' }} id="nickname-duplicated-error-id" role="alert">
              사용불가한 닉네임 입니다.
            </p>
          </Stagger>
        )}
        {checkCnt > 0 && nicknameStatus && (
          <Stagger>
            <p style={{ color: '#00BAF6' }}>사용가능한 닉네임 입니다.</p>
          </Stagger>
        )}
      </FlexGroup>
    </FullHeight>
  )
}

const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.thin29}
    margin-bottom: 12px;
  `}
`

const Input = styled.input`
  display: block;
  width: 200px;
  height: 32px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 2px 16px;

  &[aria-invalid='true'] {
    border-color: #00baf6;
  }

  &[aria-invalid='false'] {
    border-color: red;
  }
`

const FlexGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

const containerCss = css`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 70px 15px;
`

const formCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: max-content;
  height: max-content;
  margin-bottom: 12px;
`

const btnCss = css`
  width: max-content;
  height: 32px;
`

export default SettingNicknameScreen
