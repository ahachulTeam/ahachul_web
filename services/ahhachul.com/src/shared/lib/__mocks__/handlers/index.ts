import { HttpHandler } from 'msw';

import trainHandlers from './train';
import communityHandlers from './community';
// import lostHandlers from './lost';
// import complaintsHandlers from './complaints';
// import blindDateHandlers from './blindDate';

export const handlers: HttpHandler[] = [
  ...trainHandlers,
  ...communityHandlers,
  // ...lostHandlers,
  // ...complaintsHandlers,
  // ...blindDateHandlers,
];
