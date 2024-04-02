import { HttpHandler } from 'msw';

import lostHandlers from './lost';
import communityHandlers from './community';
import complaintsHandlers from './complaints';
import trainHandlers from './train';

export const handlers: HttpHandler[] = [...lostHandlers, ...communityHandlers, ...complaintsHandlers, ...trainHandlers];
