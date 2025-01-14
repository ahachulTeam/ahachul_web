import type { LostType } from '.';
import type { CursorBasedPaginationParams } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';

interface LostFoundListParams extends WithSubwayLineId, CursorBasedPaginationParams {
  lostPostId: number;
  keyword: string;
  lostType: LostType;
}

export type ParamsOfLostFoundList = Partial<LostFoundListParams>;
