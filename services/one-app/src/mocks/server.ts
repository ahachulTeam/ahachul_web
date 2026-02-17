import { resetMockApiState } from '@ahhachul/mock-api';

import { getNodeMockServer } from './node';

export const server = getNodeMockServer();

export function resetServerMocking() {
  server.resetHandlers();
  resetMockApiState();
}
