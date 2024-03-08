import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryProvidersForTest } from 'providers/QueryProviderForTest';

const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryProvidersForTest>{children}</QueryProvidersForTest>;
};

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
