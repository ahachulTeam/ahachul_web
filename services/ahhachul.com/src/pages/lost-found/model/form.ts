import type { Article } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { LostType } from '.';

interface LostForm
  extends Pick<Article, 'title' | 'content'>,
    WithSubwayLineId {
  lostType: LostType;
  imageFiles: File[];
  categoryName: string | null;
}

export { LostForm };
