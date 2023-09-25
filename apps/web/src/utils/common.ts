import { ReactNode } from 'react'
import { ToastOptions } from 'react-toastify'

type ToastType = {
  success: (content: ReactNode, option?: ToastOptions<{}> | undefined) => void
  error: (content: ReactNode, option?: ToastOptions<{}> | undefined) => void
}

export const copyToClipboard = async (toast: ToastType, linkUrl: string) => {
  try {
    await navigator.clipboard.writeText(linkUrl)
    toast.success('링크 복사 완료')
  } catch (error) {
    toast.error('복사에 실패하였습니다.')
  }
}
