import { Global, ThemeProvider } from '@emotion/react';

import { QueryClientProvider, AuthProvider } from '@/contexts';
import { StackFlow } from '@/stackflow';
import { globalStyles, theme } from '@/styles';

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks');
  worker.start();
}

function App() {
  return (
    <QueryClientProvider>
      <Global styles={globalStyles} />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StackFlow.Routes />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
