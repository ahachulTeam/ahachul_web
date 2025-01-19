import { SmallLogeIcon } from '@/assets/icons/system';
import { StackFlow } from '@/stackflow';

import * as S from './HeaderBrand.styled';

const HeaderBrand = () => {
  return (
    <StackFlow.Link activityName="HomePage" activityParams={{}} css={S.logoStyle}>
      <SmallLogeIcon />
    </StackFlow.Link>
  );
};

export default HeaderBrand;
