import { EmptyGraphic } from '@/assets/graphics';
import { useDisableScroll } from '@/hooks';

import * as S from './EmptyList.styled';

const EmptyList = () => {
  useDisableScroll();

  return (
    <S.EmptyContainer>
      <EmptyGraphic />
      <p>검색 결과가 없습니다.</p>
    </S.EmptyContainer>
  );
};

export default EmptyList;
