import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { PASSWORD_REGEX } from '@allwagelab/constants'
import { Button } from '@allwagelab/react'

import { checkEmailDuplicate } from '@/apis/auth'
import { ErrorMessage, SuccessMessage, Label, Modal } from '@/styles'
import type { SignupFormData } from '@/types/auth'

const signupSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
    password: z.string().refine(pwd => {
      if (pwd.length < 1 || PASSWORD_REGEX.test(pwd)) {
        return true
      }
      return false
    }, '비밀번호는 영문, 숫자 특수문자 조합 8자 이상 입력해주세요.'),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

interface AccountFormProps {
  onSubmit: (data: SignupFormData) => void
  defaultValues?: SignupFormData
}

function AccountForm({ onSubmit, defaultValues }: AccountFormProps) {
  const [isEmailVerified, setIsEmailVerified] = useState(Boolean(defaultValues?.email))
  const [isEmpty, setIsEmpty] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const { mutate: checkEmail, isPending: isCheckingEmail } = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: () => {
      clearErrors('email')
      setIsEmailVerified(true)
    },
    onError: error => {
      setError('email', {
        type: 'manual',
        message: error.message,
      })
      setIsEmailVerified(false)
    },
  })

  const handleEmailCheck = async () => {
    const isValid = await trigger('email')
    if (isValid) {
      const email = watch('email')
      checkEmail(email)
    }
  }

  const handleFormSubmit = (data: SignupFormData) => {
    if (!isEmailVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일 중복 확인이 필요합니다',
      })
      return
    }
    onSubmit(data)
  }

  return (
    <Modal.Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Modal.InputSection>
        <Modal.InputGroup>
          <Label>이메일</Label>
          <EmailInputWrapper>
            <EmailInput
              type="email"
              placeholder="example@email.com"
              {...register('email', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsEmpty(e.target.value === '')
                  setIsEmailVerified(false)
                },
              })}
            />
            <Button
              type="button"
              onClick={handleEmailCheck}
              disabled={isEmpty || isEmailVerified}
              loading={isCheckingEmail}
            >
              중복 확인
            </Button>
          </EmailInputWrapper>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {isEmailVerified && <SuccessMessage>사용 가능한 이메일입니다.</SuccessMessage>}
        </Modal.InputGroup>

        <Modal.InputGroup>
          <Label>비밀번호</Label>
          <Modal.Input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </Modal.InputGroup>

        <Modal.InputGroup>
          <Label>비밀번호 확인</Label>
          <Modal.Input
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            {...register('passwordConfirm')}
          />
          {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
        </Modal.InputGroup>
      </Modal.InputSection>
      <Button full type="submit">
        다음
      </Button>
    </Modal.Form>
  )
}

const EmailInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const EmailInput = styled(Modal.Input)`
  flex: 1;
`

export default AccountForm
