import type { LostType } from '.';
import type { ResponseOfImage } from 'entities/with-server';
import type { Article } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';

interface LostForm extends Pick<Article, 'title' | 'content'>, WithSubwayLineId {
  lostType: LostType;
  imageFiles: ResponseOfImage[] | File[] | null;
  categoryName: string | null;
}

export { LostForm };
