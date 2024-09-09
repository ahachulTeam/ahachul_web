import type { Article } from 'features/articles';
import type { WithImageFile } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { ComplaintType } from '.';

export interface ComplaintForm
  extends Pick<Article, 'content'>,
    Partial<WithSubwayLineId>,
    Partial<WithImageFile> {
  complaintType: ComplaintType;
}
