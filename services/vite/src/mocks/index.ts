import { setupWorker } from 'msw/browser'

import { handlers as authHandlers } from './auth'

export const worker = setupWorker(...authHandlers)
