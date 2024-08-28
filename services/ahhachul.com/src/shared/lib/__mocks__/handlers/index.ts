import { HttpHandler } from 'msw';

import trainHandlers from './train';
// import lostHandlers from './lost';
// import communityHandlers from './community';
// import complaintsHandlers from './complaints';
// import blindDateHandlers from './blindDate';

export const handlers: HttpHandler[] = [
  ...trainHandlers,
  // ...lostHandlers,
  // ...communityHandlers,
  // ...complaintsHandlers,
  // ...blindDateHandlers,
];
