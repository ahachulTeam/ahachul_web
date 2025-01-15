import type { CategoryOfCommunity } from '.';
import type { WithImageFile } from 'entities/with-server';
import type { Article } from 'features/articles';
import type { WithSubwayLineId } from 'features/subway-lines';

interface CommunityForm
  extends Pick<Article, 'title' | 'content'>,
    Partial<WithSubwayLineId>,
    Partial<WithImageFile> {
  categoryType: CategoryOfCommunity;
}

export { CommunityForm };
