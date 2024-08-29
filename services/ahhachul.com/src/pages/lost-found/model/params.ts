import type { PageParams, PageSort } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { LostType } from '.';

type LostOriginType = 'LOST112' | 'APP';
interface LostFoundListParams extends WithSubwayLineId, PageParams {
  lostPostId: number;
  keyword: string;
  sort: PageSort;
  lostType: LostType;
  origin: LostOriginType;
}

export type ParamsOfLostFoundList = Partial<LostFoundListParams>;
