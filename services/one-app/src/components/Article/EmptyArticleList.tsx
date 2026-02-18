import { SearchEmptyState } from '@ahhachul/ui';

import { EmptyGraphic } from '@/assets/graphic';

export const EmptyArticleList = () => {
  return (
    <SearchEmptyState
      title="검색 결과가 없어요."
      illustration={<EmptyGraphic />}
      className="pt-[60px]"
    />
  );
};
