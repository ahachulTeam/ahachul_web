import type { WithArticleId } from '../model';

export function hasArticleId(data: Partial<WithArticleId>): data is WithArticleId {
  return typeof data.articleId === 'number';
}
