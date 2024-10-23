import type { CursorBasedPaginationParams } from 'entities/with-server';
import { WithArticleId } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { LostType } from '.';

interface LostFoundListParams
  extends WithSubwayLineId,
    CursorBasedPaginationParams {
  lostPostId: number;
  keyword: string;
  lostType: LostType;
}

export type ParamsOfLostFoundList = Partial<LostFoundListParams>;
export interface ParamsOfLostFoundDetail extends WithArticleId {}
