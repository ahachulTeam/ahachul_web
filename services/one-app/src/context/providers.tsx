import QueryClient from './tanstack-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClient>{children}</QueryClient>;
}
