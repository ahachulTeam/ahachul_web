import { Global, ThemeProvider } from '@emotion/react';

import { QueryClientProvider } from '@/providers';
import { StackFlow } from '@/stackflow';
import { globalStyles } from '@/styles';

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks');
  worker.start();
}

function App() {
  return (
    <QueryClientProvider>
      <Global styles={globalStyles} />
      <ThemeProvider theme={{}}>
        {/* <GlobalStyles /> */}
        <StackFlow.Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
