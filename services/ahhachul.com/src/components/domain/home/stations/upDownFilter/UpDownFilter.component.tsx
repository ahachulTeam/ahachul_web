import { TransferIcon } from '@/assets/icons/system';
import { UpDownType } from '@/types';

import * as S from './UpDownFilter.styled';

interface SubwayUpDownFilterProps {
  sort: UpDownType;
  handleSort: () => void;
}

const SubwayUpDownFilter = ({ sort, handleSort }: SubwayUpDownFilterProps) => {
  return (
    <S.FilterBtn onClick={handleSort}>
      <span>{sort === UpDownType.UP ? '상행' : '하행'}</span>
      <TransferIcon />
    </S.FilterBtn>
  );
};

export default SubwayUpDownFilter;
