import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { Button } from '@allwagelab/react'

import { sendTempPassword } from '@/apis/auth'
import { useLogin } from '@/hooks'
import {
  Container,
  ErrorMessage,
  Form,
  Input,
  InputGroup,
  SubTitle,
  SuccessMessage,
  Title,
  TitleGroup,
  Label,
  ButtonGroup,
  InputWithButton,
} from '@/styles'

const findPasswordSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
  temporaryPassword: z.string().min(1, '임시 비밀번호를 입력해주세요'),
})

type FindPasswordFormData = z.infer<typeof findPasswordSchema>

function FindPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onBlur',
  })

  const { mutate: sendTemporaryPassword, isPending: isSendingTemp } = useMutation({
    mutationFn: sendTempPassword,
    onSuccess: () => {
      setSuccessMessage('이메일로 임시 비밀번호를 발송했습니다. 이메일을 확인해주세요.')
    },
    onError: (error: Error) => {
      setError('email', {
        type: 'manual',
        message: error.message,
      })
      setSuccessMessage(null)
    },
  })

  const { login, isLoggingIn } = useLogin({
    onError: () => {
      setError('temporaryPassword', {
        type: 'manual',
        message: '임시 비밀번호가 올바르지 않습니다',
      })
    },
    redirectTo: '/home',
    // redirectTo: '/mypage/reset-password',
  })

  const handleSendTemporary = async () => {
    const isValid = await trigger('email')
    if (isValid) {
      const email = watch('email')
      sendTemporaryPassword(email)
    }
  }

  const onSubmit = async (data: FindPasswordFormData) => {
    login({
      email: data.email,
      password: data.temporaryPassword,
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register('email').onChange(e)
    setSuccessMessage(null)
    clearErrors('email')
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TitleGroup>
          <Title>비밀번호를 잊으셨나요?</Title>
          <SubTitle>가입된 이메일 확인을 위해 휴대전화번호를 입력해 주세요.</SubTitle>
        </TitleGroup>

        <InputGroup>
          <Label>이메일</Label>
          <InputWithButton>
            <Input
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              onChange={handleEmailChange}
            />
            <Button
              type="button"
              loading={isSendingTemp}
              onClick={handleSendTemporary}
              disabled={!!successMessage}
            >
              임시 비밀번호 발급
            </Button>
          </InputWithButton>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </InputGroup>

        <InputGroup>
          <Label>임시 비밀번호</Label>
          <Input
            type="password"
            placeholder="발급받은 임시 비밀번호를 입력해주세요"
            {...register('temporaryPassword')}
          />
          {errors.temporaryPassword && (
            <ErrorMessage>{errors.temporaryPassword.message}</ErrorMessage>
          )}
        </InputGroup>

        <ButtonGroup>
          <Button full type="submit" loading={isLoggingIn}>
            로그인 하기
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  )
}

export default FindPasswordPage
