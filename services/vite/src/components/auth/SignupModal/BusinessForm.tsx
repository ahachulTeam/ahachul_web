import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { BUSINESS_NUMBER_REGEX, PHONE_NUMBER_REGEX } from '@allwagelab/constants'
import { Button } from '@allwagelab/react'
import { formatBusinessNumber, formatPhoneNumber } from '@allwagelab/utils'

import { verifyBusinessNumber, requestPhoneVerification, verifyPhoneNumber } from '@/apis/auth'
import useTimer from '@/hooks/useTimer'
import { Label, ErrorMessage, SuccessMessage, Modal } from '@/styles'
import type { BusinessInfoFormData } from '@/types/auth'

const businessInfoSchema = z.object({
  businessName: z.string().min(1, '사업장 이름을 입력해주세요'),
  businessNumber: z
    .string()
    .min(1, '사업장 등록 번호를 입력해주세요.')
    .regex(BUSINESS_NUMBER_REGEX, '올바른 사업자 등록번호 형식이 아닙니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요.')
    .regex(PHONE_NUMBER_REGEX, '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-0000-0000)'),
  employeeCount: z.enum(['under5', 'over5'], {
    required_error: '직원 수를 선택해주세요.',
  }),
})

interface BusinessFormProps {
  onSubmit: (data: BusinessInfoFormData) => void
  onBack: () => void
}

function BusinessForm({ onSubmit, onBack }: BusinessFormProps) {
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [showVerificationField, setShowVerificationField] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [isBusinessNumberEmpty, setIsBusinessNumberEmpty] = useState(true)
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    mode: 'onBlur',
  })

  const {
    formatTime,
    start: startTimer,
    stop: stopTimer,
    isRunning,
  } = useTimer({
    initialSeconds: 180,
    onEnd: () => {
      setError('verificationCode', {
        type: 'manual',
        message: '인증 시간이 만료되었습니다. 다시 시도해주세요.',
      })
    },
  })

  const { mutate: verifyBusiness, isPending: isVerifyingBusiness } = useMutation({
    mutationFn: verifyBusinessNumber,
    onSuccess: () => {
      clearErrors('businessNumber')
      setIsBusinessNumberVerified(true)
    },
    onError: (error: Error) => {
      setError('businessNumber', {
        type: 'manual',
        message: error.message,
      })
      setIsBusinessNumberVerified(false)
    },
  })

  const { mutate: sendVerification, isPending: isSendingVerification } = useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: () => {
      setShowVerificationField(true)
      clearErrors('verificationCode')
      startTimer()
    },
    onError: (error: Error) => {
      setError('phoneNumber', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const { mutate: verifyPhone, isPending: isVerifyingPhone } = useMutation({
    mutationFn: ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
      verifyPhoneNumber(phoneNumber, code),
    onSuccess: () => {
      setIsPhoneVerified(true)
      clearErrors('verificationCode')
    },
    onError: (error: Error) => {
      setError('verificationCode', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const handleBusinessNumberVerify = async () => {
    const isValid = await trigger('businessNumber')

    if (isValid) {
      const businessNumber = watch('businessNumber')
      verifyBusiness(businessNumber)
    }
  }

  const handlePhoneVerification = async () => {
    const isValid = await trigger('phoneNumber')

    if (isValid) {
      const phoneNumber = watch('phoneNumber')
      sendVerification(phoneNumber)
      setIsPhoneVerified(false)
    }
  }

  const handleVerifyCode = async () => {
    const code = watch('verificationCode')
    if (!code) {
      setError('verificationCode', {
        message: '인증번호를 입력해주세요',
      })

      return
    }

    const phoneNumber = watch('phoneNumber')
    verifyPhone({ phoneNumber, code })
    stopTimer()
  }

  const handleBusinessNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    e.target.value = formatBusinessNumber(value)
    register('businessNumber').onChange(e)
    setIsBusinessNumberEmpty(value === '')
    setIsBusinessNumberVerified(false)
    clearErrors('businessNumber')
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    e.target.value = formatPhoneNumber(value)
    register('phoneNumber').onChange(e)
    setIsPhoneNumberEmpty(value === '')
    setIsPhoneVerified(false)
    setShowVerificationField(false)
    clearErrors('phoneNumber')
  }

  const onFormSubmit = async (data: BusinessInfoFormData) => {
    setSubmitError('')

    if (!isBusinessNumberVerified) {
      setError('businessNumber', {
        type: 'manual',
        message: '사업자 등록번호 중복 확인이 필요합니다',
      })
      return
    }

    if (!isPhoneVerified) {
      setError('phoneNumber', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다',
      })
      return
    }

    try {
      await onSubmit(data)
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        setSubmitError('회원가입 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <Modal.Form onSubmit={handleSubmit(onFormSubmit)}>
      <Modal.InputSection>
        <Modal.InputGroup>
          <Label>사업장 이름</Label>
          <Modal.Input type="text" placeholder="올웨이지 시청점" {...register('businessName')} />
          {errors.businessName && <ErrorMessage>{errors.businessName.message}</ErrorMessage>}
        </Modal.InputGroup>

        <Modal.InputGroup>
          <Label>사업자 등록 번호</Label>
          <InputWithButton>
            <Modal.Input
              type="text"
              placeholder="000-00-00000"
              {...register('businessNumber')}
              onChange={handleBusinessNumberChange}
            />
            <Button
              type="button"
              onClick={handleBusinessNumberVerify}
              disabled={isBusinessNumberEmpty || isBusinessNumberVerified}
              loading={isVerifyingBusiness}
            >
              중복 확인
            </Button>
          </InputWithButton>
          {errors.businessNumber && <ErrorMessage>{errors.businessNumber.message}</ErrorMessage>}
          {isBusinessNumberVerified && (
            <SuccessMessage>등록 가능한 사업자 번호입니다</SuccessMessage>
          )}
        </Modal.InputGroup>

        <Modal.InputGroup>
          <Label>휴대폰 번호</Label>
          <InputWithButton>
            <Modal.Input
              type="tel"
              placeholder="010-0000-0000"
              {...register('phoneNumber')}
              onChange={handlePhoneNumberChange}
            />
            <Button
              type="button"
              onClick={handlePhoneVerification}
              disabled={isPhoneNumberEmpty || isSendingVerification}
            >
              {showVerificationField ? '재전송' : '인증 요청'}
            </Button>
          </InputWithButton>
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
          {isRunning && (
            <SuccessMessage>인증번호를 발송했습니다. 최대 3분이 소요될 수 있습니다.</SuccessMessage>
          )}
        </Modal.InputGroup>

        {showVerificationField && (
          <Modal.InputGroup>
            <Label>인증번호</Label>
            <InputWithButton>
              <Modal.Input
                type="text"
                placeholder="인증번호 입력"
                {...register('verificationCode')}
              />
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={isPhoneVerified}
                loading={isVerifyingPhone}
              >
                인증 확인
              </Button>
            </InputWithButton>
            {isRunning && <TimerText>{formatTime()}</TimerText>}
            {errors.verificationCode && (
              <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>
            )}
            {isPhoneVerified && <SuccessMessage>휴대폰 인증이 완료되었습니다</SuccessMessage>}
          </Modal.InputGroup>
        )}

        <Modal.InputGroup>
          <Label>직원 수</Label>
          <RadioGroup>
            <RadioLabel>
              <RadioInput
                type="radio"
                value="under5"
                defaultChecked
                {...register('employeeCount')}
              />
              5인 미만
            </RadioLabel>
            <RadioLabel>
              <RadioInput type="radio" value="over5" {...register('employeeCount')} />
              5인 이상
            </RadioLabel>
          </RadioGroup>
          {errors.employeeCount && <ErrorMessage>{errors.employeeCount.message}</ErrorMessage>}
        </Modal.InputGroup>
      </Modal.InputSection>

      <ButtonGroup>
        <Button full type="button" variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button full type="submit">
          회원가입 완료
        </Button>
      </ButtonGroup>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
    </Modal.Form>
  )
}

const InputWithButton = styled.div`
  display: grid;
  grid-template-columns: auto 106px;
  gap: 8px;

  button {
    min-width: 90px;
  }
`

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
`

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const RadioInput = styled.input`
  cursor: pointer;
`

const TimerText = styled.span`
  color: #1c61ff;
  font-size: 14px;
`

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 132px auto;
  gap: 12px;
`

export default BusinessForm
