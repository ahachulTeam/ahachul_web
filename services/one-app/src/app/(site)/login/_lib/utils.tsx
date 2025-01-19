import { CheckIcon, AlertCircleIcon } from '@/common/assets/icons';

export const renderIndicatorIcon = (isValidateOk: boolean, isValidateError: boolean) => {
  if (isValidateOk) {
    return <CheckIcon />;
  }
  if (isValidateError) {
    return <AlertCircleIcon />;
  }
  return null;
};
