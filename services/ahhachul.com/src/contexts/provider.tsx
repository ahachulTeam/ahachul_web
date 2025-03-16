import { PropsWithChildren } from 'react';

import { ThemeProvider, Global } from '@emotion/react';

import { QueryClientProvider, AuthProvider, NativeBridge } from '@/contexts';
import { globalStyles, theme } from '@/styles';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <NativeBridge>
          <QueryClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </NativeBridge>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;
