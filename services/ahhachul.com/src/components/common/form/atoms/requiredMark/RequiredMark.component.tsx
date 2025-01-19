import { css } from '@emotion/react';

import * as S from './RequiredMark.styled';

interface RequiredMarkProps {
  overrideCss?: ReturnType<typeof css>;
}
const RequiredMark = ({ overrideCss }: RequiredMarkProps) => {
  return <S.RequiredMark css={overrideCss} />;
};

export default RequiredMark;
