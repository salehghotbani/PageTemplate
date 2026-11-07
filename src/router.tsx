import { createBrowserRouter } from 'react-router';
import { EXAMPLE_ROUTE, LANDING_ROUTE } from '@/Components/Base/BaseRouts';
import AppLayout from '@/Components/Base/AppLayout';
import ErrorFallback from '@/Components/Base/ErrorFallback';
import PageLoader from '@/Components/Base/PageLoader';
import PageNotFound404 from '@/Components/Base/PageNotFound404';
import HomePage from '@/Components/Pages/Home/HomePage';

export const router = createBrowserRouter([
  {
    path: LANDING_ROUTE,
    Component: AppLayout,
    ErrorBoundary: ErrorFallback,
    HydrateFallback: PageLoader,
    children: [
      { index: true, Component: HomePage },
      {
        path: EXAMPLE_ROUTE,
        lazy: async () => ({
          Component: (await import('@/Components/Pages/Example/ExamplePage'))
            .default,
        }),
      },
      { path: '*', Component: PageNotFound404 },
    ],
  },
]);
