import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { useShallow } from 'zustand/shallow'

import { login } from '@/apis/auth'
import { useAuthStore } from '@/stores/auth'

interface UseLoginProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  redirectTo?: string
}

export const useLogin = ({ onSuccess, onError, redirectTo = '/' }: UseLoginProps = {}) => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore(
    useShallow(state => ({
      setAuth: state.setAuth,
    })),
  )

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: response => {
      const { accessToken } = response.data
      setAuth({ accessToken })

      if (onSuccess) {
        onSuccess()
      }

      navigate(redirectTo)
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  return {
    login: loginMutate,
    isLoggingIn: isPending,
  }
}
