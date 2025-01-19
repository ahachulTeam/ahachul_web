import { authHandlers, lostFoundHandlers, userHandlers } from './units';

export const handlers = [...authHandlers, ...userHandlers, ...lostFoundHandlers];
