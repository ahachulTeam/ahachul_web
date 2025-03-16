import { createRoot } from 'react-dom/client';

import App from './App';
import { Provider } from './contexts';

function render() {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <Provider>
      <App />
    </Provider>,
  );
}

export { render };
