import { HttpHandler } from 'msw';

import trainHandlers from './train';
import communityHandlers from './community';
import lostHandlers from './lost';
import complaintsHandlers from './complaints';
import commentsHandlers from './comments';
// import blindDateHandlers from './blindDate';

export const handlers: HttpHandler[] = [
  ...trainHandlers,
  ...lostHandlers,
  ...communityHandlers,
  ...complaintsHandlers,
  ...commentsHandlers,
  // ...blindDateHandlers,
];
