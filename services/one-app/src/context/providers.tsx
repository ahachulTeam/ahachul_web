import { NuqsAdapter } from 'nuqs/adapters/next/app';

import QueryClient from './tanstack-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryClient>{children}</QueryClient>
    </NuqsAdapter>
  );
}
