import { HttpHandler } from 'msw';

import commentsHandlers from './comments';
import communityHandlers from './community';
import complaintsHandlers from './complaints';
import lostHandlers from './lost';
import trainHandlers from './train';

// import blindDateHandlers from './blindDate';

export const handlers: HttpHandler[] = [
  ...trainHandlers,
  ...lostHandlers,
  ...communityHandlers,
  ...complaintsHandlers,
  ...commentsHandlers,
  // ...blindDateHandlers,
];
