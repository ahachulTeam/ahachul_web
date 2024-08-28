import type { Article } from 'features/articles';
import type { WithImageFile } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { LostType } from '.';

interface LostForm
  extends Pick<Article, 'title' | 'content'>,
    Partial<WithSubwayLineId>,
    Partial<WithImageFile> {
  lostType: LostType;
}

export { LostForm };
