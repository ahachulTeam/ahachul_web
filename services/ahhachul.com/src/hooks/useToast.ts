import { useToastStore, type ToastType } from '@/stores/toast';

export const useToast = () => {
  const { addToast, removeToast } = useToastStore();

  return {
    addToast: (message: string, type: ToastType = 'info', duration?: number) => {
      addToast(message, type, duration);
    },
    removeToast,
    toast: {
      success: (message: string, duration?: number) => addToast(message, 'success', duration),
      warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
      info: (message: string, duration?: number) => addToast(message, 'info', duration),
      error: (message: string, duration?: number) => addToast(message, 'error', duration),
    },
  };
};
