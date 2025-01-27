import { CheckIcon, AlertCircleIcon } from '@/asset/icon';

export const renderIndicatorIcon = (isValidateOk: boolean, isValidateError: boolean) => {
  if (isValidateOk) {
    return <CheckIcon />;
  }
  if (isValidateError) {
    return <AlertCircleIcon />;
  }
  return null;
};
