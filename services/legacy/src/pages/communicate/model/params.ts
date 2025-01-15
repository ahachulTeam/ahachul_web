import type { CategoryOfCommunity } from '.';
import type { PageParams, PageSort } from 'entities/with-server';
import type { WithArticleId } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';

interface CommunityListParams extends WithSubwayLineId, PageParams {
  hotPostYn: number;
  content: string;
  hashTag: string;
  sort: PageSort;
  categoryType: CategoryOfCommunity;
}
export type ParamsOfCommunityList = Partial<CommunityListParams>;
export interface ParamsOfCommunityDetail extends WithArticleId {}
