import { CheckIcon, AlertCircleIcon } from '@/common/assets/icons';

<<<<<<< HEAD
export const renderIndicatorIcon = (isValidateOk: boolean, isValidateError: boolean) => {
=======
export const renderIndicatorIcon = (
  isValidateOk: boolean,
  isValidateError: boolean,
) => {
>>>>>>> develop
  if (isValidateOk) {
    return <CheckIcon />;
  }
  if (isValidateError) {
    return <AlertCircleIcon />;
  }
  return null;
};
