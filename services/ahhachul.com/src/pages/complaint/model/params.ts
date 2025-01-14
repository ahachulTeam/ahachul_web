import type { ComplaintType } from '.';
import type { PageParams } from 'entities/with-server';
import type { WithArticleId } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';

interface ComplaintListParams extends WithSubwayLineId, PageParams {
  content: string;
  complaintType: ComplaintType;
}

export type ParamsOfComplaintList = Partial<ComplaintListParams>;
export interface ParamsOfComplaintDetail extends WithArticleId {}
