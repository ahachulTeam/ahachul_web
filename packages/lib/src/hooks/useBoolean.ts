import { useCallback, useState } from 'react'

type VoidFunction = () => void
type Return = readonly [boolean, VoidFunction, VoidFunction, VoidFunction]

/**
 * boolean을 쉽게 제어할 수 있는 hook 이에요
 *
 * @param initialValue - boolean
 * @returns [boolean state, toggle func, set true func, set false func]
 */
export const useBoolean = (initialValue = false): Return => {
  const [value, setValue] = useState(initialValue)

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, toggle, setTrue, setFalse]
}
