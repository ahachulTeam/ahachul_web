import { SearchEmptyState } from '@ahhachul/ui';

import { EmptyGraphic } from '@/assets/graphics';
import { useDisableScroll } from '@/hooks';

const EmptyList = () => {
  useDisableScroll();

  return (
    <SearchEmptyState
      title="검색 결과가 없습니다."
      illustration={<EmptyGraphic />}
      style={{ paddingTop: '184px' }}
    />
  );
};

export default EmptyList;
