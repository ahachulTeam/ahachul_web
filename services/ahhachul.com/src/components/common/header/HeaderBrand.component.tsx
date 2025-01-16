import { LogoIcon } from 'components/icons/logo';

import * as S from './HeaderBrand.styled';

const HeaderBrand = () => {
  return (
    <S.Brand activityName="HomePage" activityParams={{}}>
      <LogoIcon />
    </S.Brand>
  );
};

export default HeaderBrand;
