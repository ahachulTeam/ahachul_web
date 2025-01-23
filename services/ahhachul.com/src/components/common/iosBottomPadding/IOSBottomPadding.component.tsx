import { isIOS } from '@/constants';

import * as S from './IOSBottomPadding.styled';

export const IOSBottomPadding = () => {
  if (!isIOS()) return null;

  return <S.IOSBottomPadding />;
};
