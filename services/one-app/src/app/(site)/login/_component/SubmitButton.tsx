import { cn } from '@/common/utils/cn';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

interface SubmitButtonProps {
  disabled: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled,
  isProcessing,
  onClick,
}) => (
  <button
    disabled={disabled || isProcessing}
    className={cn(
      'w-full h-12 mt-8 text-white',
      'bg-[#2ACF6C] hover:bg-[#2ACF6C]/90',
      'disabled:bg-gray-600 disabled:cursor-not-allowed',
    )}
    onClick={onClick}
  >
    {isProcessing ? (
      <span className="flex items-center justify-center">
        <SpinnerIcon className="animate-spin mr-2" />
      </span>
    ) : (
      '완료'
    )}
  </button>
);
