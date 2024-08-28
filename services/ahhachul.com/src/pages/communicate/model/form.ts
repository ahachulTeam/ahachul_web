import type { Article } from 'features/articles';
import type { WithImageFile } from 'entities/with-server';
import type { WithSubwayLineId } from 'features/subway-lines';
import type { CategoryOfCommunity } from '.';

interface CommunityForm
  extends Pick<Article, 'title' | 'content'>,
    Partial<WithSubwayLineId>,
    Partial<WithImageFile> {
  categoryType: CategoryOfCommunity;
}

export { CommunityForm };
