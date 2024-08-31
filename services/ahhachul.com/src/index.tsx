import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppEntry } from 'app/appEntry';
import { AppProvider } from 'app/appProvider';
import { reportWebVitals } from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AppProvider>
    <AppEntry />
  </AppProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
