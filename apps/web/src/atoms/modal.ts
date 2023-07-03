/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { ComplaintTargets } from '@/types/complaint'

export interface FilterModalState {
  isOpen: boolean
  targetSection: ComplaintTargets
}

export const isFilterModalOpenState = atom<FilterModalState>({
  key: `isFilterModalOpenState/${v1()}`,
  default: {
    isOpen: false,
    targetSection: 'Patient',
  },
})

type Return = readonly [
  FilterModalState,
  (target: FilterModalState['targetSection']) => () => void,
  VoidFunction,
  VoidFunction
]

export const useFilterModalBoolean = (): Return => {
  const [value, setValue] = useRecoilState(isFilterModalOpenState)

  const setTrue = useCallback(() => {
    setValue(prev => ({ ...prev, isOpen: true }))
  }, [])

  const setFalse = useCallback(() => {
    setValue(prev => ({ ...prev, isOpen: false }))
  }, [])

  const toggle = useCallback(
    (target: FilterModalState['targetSection']) => () => {
      setValue(prev => ({ targetSection: target, isOpen: !prev.isOpen }))
    },
    []
  )

  return [value, toggle, setTrue, setFalse]
}
