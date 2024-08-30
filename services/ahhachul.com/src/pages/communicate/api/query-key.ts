import { routes } from 'shared/api';

export const COMMUNITY_QUERY_KEY = [routes.community];
// routes.community = '/community-posts'

// LIST:
// ['/community-posts', 'list', { ... }]

// DETAIL:
// ['/community-posts', 'detail', '123']

// COMMENT:
// ['/community-posts', 'detail', '123', 'comments']
