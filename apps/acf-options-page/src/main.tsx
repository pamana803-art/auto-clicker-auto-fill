import { ThemeProvider } from '@dhruv-techapps/ui-context';
import ReactDOM from 'https://esm.sh/react-dom@19.1.0/client';
import { StrictMode } from 'https://esm.sh/react@19.1.0';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import './utils/i18n';
import './utils/instrument';
import { router } from './utils/routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
