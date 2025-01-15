import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IToken } from '@/types/auth'

interface IAuthStore {
  auth: IToken | null
  setAuth: (authData: IToken | null) => void
  reset: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    set => ({
      auth: null,
      setAuth: (authData: IToken | null) => {
        set({ auth: authData })
      },
      reset: () => {
        set({ auth: null })
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => state => {
        if (localStorage.getItem('autoLogin') !== 'Y' && state) {
          localStorage.removeItem('autoLogin')
          state.setAuth(null)
        }
      },
    },
  ),
)
