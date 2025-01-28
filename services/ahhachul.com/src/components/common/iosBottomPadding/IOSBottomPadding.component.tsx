import { isWebView } from '@/constants';

import * as S from './IOSBottomPadding.styled';

export const IOSBottomPadding = () => {
  if (!isWebView()) return null;

  return <S.IOSBottomPadding />;
};
