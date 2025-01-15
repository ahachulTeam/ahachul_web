import { theme, GlobalStyles } from '@allwagelab/design';
import { ThemeProvider } from '@emotion/react';

import { QueryClientProvider } from '@/providers';

import { StackFlow } from './stackflow';

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks');
  worker.start();
}

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StackFlow.Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
