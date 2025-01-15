import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { signup } from '@/apis/auth'
import Modal from '@/components/ui/Modal'
import type { BusinessInfoFormData, SignupFormData } from '@/types/auth'

import AccountForm from './AccountForm'
import BusinessForm from './BusinessForm'
import SuccessView from './SuccessView'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  link?: string
}

type SignupStep = 'ACCOUNT' | 'BUSINESS' | 'SUCCESS'

const titles: Record<SignupStep, string> = {
  ACCOUNT: '회원가입',
  BUSINESS: '사업장 정보 입력',
  SUCCESS: '',
}

function SignupModal({ isOpen, onClose, link }: SignupModalProps) {
  const navigator = useNavigate()
  const [currentStep, setCurrentStep] = useState<SignupStep>('ACCOUNT')
  const [accountData, setAccountData] = useState<SignupFormData | null>(null)
  const [name, setName] = useState<string>('')

  const { mutate: registerUser } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setCurrentStep('SUCCESS')
    },
    onError: (error: Error) => {
      throw error
    },
  })

  const handleAccountSubmit = (data: SignupFormData) => {
    setAccountData(data)
    setCurrentStep('BUSINESS')
  }

  const handleBusinessSubmit = (businessData: BusinessInfoFormData) => {
    if (!accountData) {
      return
    }

    registerUser({
      email: accountData.email,
      password: accountData.password,
      hp: businessData.phoneNumber,
      sub: {
        name: businessData.businessName,
        registration: businessData.businessNumber,
        staffCount: businessData.employeeCount === 'under5' ? 'UNDER_FIVE' : 'OVER_FIVE',
      },
    })

    setName(businessData.businessName)
  }

  const handleBack = () => {
    setCurrentStep('ACCOUNT')
  }

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('ACCOUNT')
      setAccountData(null)
    }
  }, [isOpen])

  const handleComplete = () => {
    if (link) {
      navigator(link)
    } else {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titles[currentStep]}>
      {currentStep === 'ACCOUNT' ? (
        <AccountForm onSubmit={handleAccountSubmit} defaultValues={accountData || undefined} />
      ) : currentStep === 'BUSINESS' ? (
        <BusinessForm onSubmit={handleBusinessSubmit} onBack={handleBack} />
      ) : (
        <SuccessView name={name} onComplete={handleComplete} />
      )}
    </Modal>
  )
}

export default SignupModal
