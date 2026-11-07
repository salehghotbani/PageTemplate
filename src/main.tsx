import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import ErrorBoundary from '@/Components/Base/ErrorBoundary';
import QueryProvider from '@/Components/Base/QueryProvider';
import { Provider as ChakraUIProvider } from '@/Components/ui/provider';
import { i18nReady } from './i18n';
import { router } from './router';

await i18nReady;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ChakraUIProvider storageKey="page-template.theme">
      <ErrorBoundary>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ErrorBoundary>
    </ChakraUIProvider>
  </StrictMode>,
);
