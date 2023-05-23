import { FullHeight, Button } from '@ahhachul/ui'
import { useEffect, useState } from 'react'

import * as S from './styled'
import { Stagger } from '@/components/common'
import { useToast } from '@/hooks'
import useMyProfileMutation from '@/queries/user/useMyProfileMutation'
import { useVerifyNickname } from '@/queries/user/useVerifyNickname'

function NicknamePageContainer() {
  const [checkCnt, setCheckCnt] = useState(0)
  const [nickname, setNickname] = useState<string>('')
  const [nicknameStatus, setNicknameStatus] = useState<boolean | null>(null)

  const { data, isLoading, mutate: verifyNicknameMutate } = useVerifyNickname()
  const { mutate: updateMyProfileMutate } = useMyProfileMutation()

  const { success } = useToast()

  const handleNicknameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)

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
    !isLoading && setNicknameStatus(data?.result?.available as boolean)
  }, [data?.result?.available, isLoading])

  return (
    <FullHeight css={S.containerCss}>
      <Stagger>
        <S.Title>닉네임을 설정해 주세요</S.Title>
        <form onSubmit={handleSubmitNickname} css={S.formCss}>
          <S.Input type="text" value={nickname} data-isvalid={nicknameStatus} onChange={handleNicknameInputChange} />
          <S.BtnGroup>
            <Button
              css={S.btnCss}
              type="submit"
              size="md"
              label="중복체크"
              variant="primary"
              disabled={Boolean(nickname === '')}
              onClick={handleVerifyNickname}
            />
            {nicknameStatus && (
              <Button
                css={S.btnCss}
                type="button"
                size="md"
                variant="secondary"
                label="닉네임 제출하기"
                onClick={handleSubmitNickname}
              />
            )}
          </S.BtnGroup>
        </form>
      </Stagger>

      <S.BtnGroup>
        {checkCnt > 0 && nicknameStatus === false && nicknameStatus !== null && (
          <Stagger>
            <p style={{ color: 'red' }}>사용불가한 닉네임 입니다.</p>
          </Stagger>
        )}
        {checkCnt > 0 && nicknameStatus && (
          <Stagger>
            <p style={{ color: '#00BAF6' }}>사용가능한 닉네임 입니다.</p>
          </Stagger>
        )}
      </S.BtnGroup>
    </FullHeight>
  )
}

export default NicknamePageContainer
