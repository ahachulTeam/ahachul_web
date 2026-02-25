import { GlobalAppErrorBoundary, GlobalErrorListeners } from '@/components/Error';
import { MSWComponent } from '@/components/MSWComponent';

import QueryClient from './tanstack-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWComponent>
      <GlobalAppErrorBoundary>
        <GlobalErrorListeners />
        <QueryClient>{children}</QueryClient>
      </GlobalAppErrorBoundary>
    </MSWComponent>
  );
}
