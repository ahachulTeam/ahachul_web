import { useShallow } from 'zustand/react/shallow'

import { axiosPrivateInstance } from '@/apis'
import { useAuthStore } from '@/stores/auth'

export const useRefreshToken = () => {
  const setAuth = useAuthStore(useShallow(state => state.setAuth))

  const refresh = async () => {
    try {
      const response = await axiosPrivateInstance.post('/auth/refresh/token')
      const accessToken = response.data.data.accessToken
      setAuth({ accessToken })

      return accessToken
    } catch {
      setAuth(null)
      throw new Error('refresh token error')
    }
  }

  return refresh
}
