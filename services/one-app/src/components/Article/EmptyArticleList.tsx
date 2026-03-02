import { SearchEmptyState } from '@ahhachul/ui';

import { EmptyGraphic } from '@/assets/graphic';

export const EmptyArticleList = () => {
  return (
    <SearchEmptyState
      title="검색 결과가 없습니다."
      illustration={<EmptyGraphic />}
      className="rounded-3xl border border-gray-30 bg-white pt-[160px] shadow-[0_10px_24px_rgba(14,20,28,0.08)]"
    />
  );
};
