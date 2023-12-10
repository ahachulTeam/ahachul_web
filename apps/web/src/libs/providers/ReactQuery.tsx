import { Hydrate, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

interface ReactQueryProps extends PropsWithChildren {
  state: DehydratedState
}

export default function ReactQuery({ children, state }: ReactQueryProps) {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            retryOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {children}
      </Hydrate>
    </QueryClientProvider>
  )
}
