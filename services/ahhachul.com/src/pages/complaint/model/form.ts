import type { WithImageFile } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { ComplaintArticle, ComplaintType } from '.';

export interface ComplaintForm
  extends Pick<
      ComplaintArticle,
      'content' | 'complaintType' | 'shortContentType'
    >,
    Partial<WithSubwayLineId>,
    Partial<WithImageFile> {}
