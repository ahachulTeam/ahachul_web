import type { PageParams, PageSort } from 'entities/with-server';
import type { CategoryOfCommunity } from '.';

interface CommunityListParams extends PageParams {
  subwayLineId: number;
  hotPostYn: number;
  content: string;
  hashTag: string;
  sort: PageSort;
  categoryType: CategoryOfCommunity;
}
export type ParamsOfCommunityList = Partial<CommunityListParams>;
