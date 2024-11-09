import CheckIcon from '@/common/assets/icons/check';
import AlertCircleIcon from '@/common/assets/icons/alert-circle';

export const renderNicknameInputIcon = (
  isValidateOk: boolean,
  isValidateError: boolean,
) => {
  if (isValidateOk) {
    return <CheckIcon />;
  }
  if (isValidateError) {
    return <AlertCircleIcon />;
  }
  return null;
};
