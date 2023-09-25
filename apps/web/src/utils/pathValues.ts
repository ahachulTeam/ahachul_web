import Cookies from 'js-cookie'
import { CurrentPath, PrevPath } from '@/constants/pathValues'

export const getPrevPathValueFromCookie = () => {
  return Cookies.get(PrevPath)
}

export const setPrevPathValueToCookie = (token: string) => {
  const farFutureDate = new Date('9999-12-31T23:59:59')

  Cookies.set(PrevPath, token, {
    expires: new Date(farFutureDate),
    sameSite: 'lax',
  })
}

export const getCurrentPathValueFromCookie = () => {
  return Cookies.get(CurrentPath)
}

export const setCurrentPathValueToCookie = (token: string) => {
  const farFutureDate = new Date('9999-12-31T23:59:59')

  Cookies.set(CurrentPath, token, {
    expires: new Date(farFutureDate),
    sameSite: 'lax',
  })
}
