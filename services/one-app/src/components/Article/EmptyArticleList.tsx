import { SearchEmptyState } from '@ahhachul/ui';

import { EmptyGraphic } from '@/assets/graphic';

export const EmptyArticleList = () => {
  return (
    <SearchEmptyState
      title="검색 결과가 없습니다."
      illustration={<EmptyGraphic />}
      className="pt-[184px]"
    />
  );
};
