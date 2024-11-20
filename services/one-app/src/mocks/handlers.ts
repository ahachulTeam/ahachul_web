import {
  authHandlers,
  userHandlers,
  lostFoundHandlers,
  throwErrorHandlers,
} from './units';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...lostFoundHandlers,
  ...throwErrorHandlers,
];
