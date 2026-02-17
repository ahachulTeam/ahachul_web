# @ahhachul/mock-api

Shared MSW handler package for dual-app mock mode.

## Responsibilities

- Own deterministic in-memory mock state for API contracts.
- Provide shared MSW handlers for browser (`setupWorker`) and node (`setupServer`) runtimes.
- Enforce strict unhandled API policy to prevent backend leak-through in mock mode.

## Exports

- `mockApiHandlers`
- `createMockUnhandledRequestStrategy`
- `resetMockApiState`
- `isApiRequestPath`
- `isApiRequest`

## Runtime Integration

- Vite: consume handlers in `services/ahhachul.com/src/mocks/*`
- Next:
  - browser: `services/one-app/src/mocks/browser.ts` + `MSWComponent`
  - node: `services/one-app/src/mocks/node.ts` + `src/instrumentation.ts`

## Regression

- `pnpm --filter @ahhachul/mock-api test`
