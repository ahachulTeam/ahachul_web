import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  addToast: (message, type, duration = 3000) => {
    const id = uuidv4();
    set(state => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    // Auto-remove toast after duration
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
}));
