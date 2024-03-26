import { HttpHandler } from 'msw';

import lostHandlers from './lost';
import communityHandlers from './community';

export const handlers: HttpHandler[] = [...lostHandlers, ...communityHandlers];
