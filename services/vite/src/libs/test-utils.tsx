import React, { type ReactElement } from 'react'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { render, renderHook, type RenderOptions } from '@testing-library/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper, ...options })
const customRenderHook: typeof renderHook = (render, options) =>
  renderHook(render, { wrapper, ...options })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render, customRenderHook as renderHook }
