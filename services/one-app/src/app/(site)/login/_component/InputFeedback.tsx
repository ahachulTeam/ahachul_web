import { cn } from '@/common/utils/cn';

interface InputFeedbackProps {
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export const InputFeedback: React.FC<InputFeedbackProps> = ({
  message,
  isError,
  isSuccess,
}) => (
  <span
    className={cn(
      'text-sm',
      isError && 'text-red-500',
      isSuccess && 'text-[#2ACF6C]',
      !isError && !isSuccess && 'text-gray-500',
    )}
  >
    {message}
  </span>
);
