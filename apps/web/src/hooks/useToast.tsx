import { toast, ToastOptions } from 'react-toastify'

import { Notification } from '@/assets/icons'

export const useToast = () => {
  const success = (content: React.ReactNode, option?: ToastOptions) => {
    toast.success(content, {
      icon: false,
      ...option,
    })
  }

  const error = (content: React.ReactNode, option?: ToastOptions) => {
    toast.error(content, {
      icon: <Notification />,
      ...option,
    })
  }

  return { success, error }
}
