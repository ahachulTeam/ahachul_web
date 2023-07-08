import { Hydrate, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      suspense: true,
      retry: 0,
    },
  },
})

interface ReactQueryProps extends PropsWithChildren {
  state: DehydratedState
}

export default function ReactQuery({ children, state }: ReactQueryProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </Hydrate>
    </QueryClientProvider>
  )
}
