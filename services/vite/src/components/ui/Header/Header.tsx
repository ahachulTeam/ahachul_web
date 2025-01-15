import { useShallow } from 'zustand/shallow'

import { useAuthStore } from '@/stores/auth'

function Header() {
  const { reset } = useAuthStore(
    useShallow(state => ({
      reset: state.reset,
    })),
  )

  return (
    <header>
      Allwage Lab
      <button type="button" onClick={reset}>
        logout
      </button>
    </header>
  )
}

export default Header
