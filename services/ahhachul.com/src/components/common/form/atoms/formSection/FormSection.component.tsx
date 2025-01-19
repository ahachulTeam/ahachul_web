import type { PropsWithChildren } from 'react';

import * as S from './FormSection.styled';

const FormSection = ({ children }: PropsWithChildren) => {
  return <S.FormSection>{children}</S.FormSection>;
};

export default FormSection;
