import ReactDOM from 'react-dom/client';

import { AppEntry } from 'app/appEntry';
import { AppProvider } from 'app/appProvider';

import { reportWebVitals } from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppProvider>
    <AppEntry />
  </AppProvider>,
);

reportWebVitals();
