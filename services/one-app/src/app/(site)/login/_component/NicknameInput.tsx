import { cn } from '@/common/utils/cn';
import CheckIcon from '@/common/assets/icons/check';
import AlertCircleIcon from '@/common/assets/icons/alert-circle';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

interface NicknameInputProps {
  value: string;
  isError: boolean;
  isSuccess: boolean;
  isChecking: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NicknameInput: React.FC<NicknameInputProps> = ({
  value,
  onChange,
  isError,
  isSuccess,
  isChecking,
}) => (
  <div className="relative">
    <input
      value={value}
      placeholder="닉네임을 입력해주세요"
      onChange={onChange}
      className={cn(
        'w-full h-12 bg-white/10 border-0 px-3 text-white placeholder:text-gray-500',
        'focus:outline-none focus:bg-white/15',
        isError && 'ring-2 ring-red-500',
        isSuccess && 'ring-2 ring-[#2ACF6C]',
      )}
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {isError && <AlertCircleIcon />}
      {isSuccess && <CheckIcon />}
      {isChecking && <SpinnerIcon className="animate-spin" />}
    </div>
  </div>
);
