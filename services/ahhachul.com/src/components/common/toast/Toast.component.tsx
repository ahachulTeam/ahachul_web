import type React from 'react';
import { useEffect } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

import { useToastStore, type ToastType } from '@/stores/toast';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: AlertCircle,
};

const getToastStyle = (type: ToastType) => {
  switch (type) {
    case 'success':
      return css`
        background-color: #22c55e;
        color: white;
      `;
    case 'warning':
    case 'error':
      return css`
        background-color: #ef4444;
        color: white;
      `;
    case 'info':
      return css`
        background-color: #3b82f6;
        color: white;
      `;
    default:
      return css`
        background-color: #ef4444;
        color: white;
      `;
  }
};

const ToastContainer = styled.div`
  position: fixed;
  bottom: 3.3rem;
  right: 1rem;
  left: 1rem;
  width: calc(100% - 2rem);
  margin: 0 auto;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ToastWrapper = styled.div<{ type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 28rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  ${({ type }) => getToastStyle(type)}
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
`;

const ToastMessage = styled.span`
  font-weight: 500;
  margin-left: 0.5rem;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const Icon = toastIcons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastWrapper type={type} role="alert">
      <ToastContent>
        <Icon size={20} />
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
      <CloseButton onClick={onClose} aria-label="Close">
        <X size={16} />
      </CloseButton>
    </ToastWrapper>
  );
};

const ToastContainerComponent: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastContainer>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainer>
  );
};

export default ToastContainerComponent;
