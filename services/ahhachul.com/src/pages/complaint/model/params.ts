import type { PageParams, PageSort } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { ComplaintType } from '.';

interface ComplaintListParams extends WithSubwayLineId, PageParams {
  content: string;
  complaintType: ComplaintType;
}

export type ParamsOfComplaintList = Partial<ComplaintListParams>;
