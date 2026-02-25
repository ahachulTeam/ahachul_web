import { createRoot } from 'react-dom/client';

import App from './App';
import { UiComponent } from './components';
import { Provider } from './contexts';

function render() {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <Provider>
      <UiComponent.GlobalErrorListeners />
      <UiComponent.GlobalAppErrorBoundary>
        <App />
      </UiComponent.GlobalAppErrorBoundary>
    </Provider>,
  );
}

export { render };
