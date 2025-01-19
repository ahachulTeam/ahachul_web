import { LogoIcon } from '@/assets/icons/system';
import LogoImg from '@/assets/images/logo.png';

import * as S from './CenterFixedLogo.styled';

const CenterFixedLogo = () => {
  return (
    <S.CenterLogoGroup>
      <img src={LogoImg} alt="ahhachul-app-logo" />
      <div>
        <span>더 편한 지하철을 만드는</span>
        <LogoIcon />
      </div>
    </S.CenterLogoGroup>
  );
};

export default CenterFixedLogo;
