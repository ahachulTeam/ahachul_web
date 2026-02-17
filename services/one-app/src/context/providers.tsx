import { MSWComponent } from '@/component/MSWComponent';

import QueryClient from './tanstack-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWComponent>
      <QueryClient>{children}</QueryClient>
    </MSWComponent>
  );
}
