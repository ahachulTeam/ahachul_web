import { setupServer } from 'msw/node'

import { handlers as authHandlers } from './auth'

export const server = setupServer(...authHandlers)
