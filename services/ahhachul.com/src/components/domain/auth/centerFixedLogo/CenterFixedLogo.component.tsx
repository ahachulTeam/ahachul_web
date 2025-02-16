import { LogoIcon, LogoTextIcon } from '@/assets/icons/system';

import * as S from './CenterFixedLogo.styled';

const CenterFixedLogo = () => {
  return (
    <S.CenterLogoGroup>
      <LogoIcon />
      <div>
        <span>더 편한 지하철을 만드는</span>
        <LogoTextIcon />
      </div>
    </S.CenterLogoGroup>
  );
};

export default CenterFixedLogo;
