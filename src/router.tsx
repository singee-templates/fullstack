import { createRouter } from '@tanstack/react-router';
import { nprogress } from '@mantine/nprogress';
import { QueryClient } from '@tanstack/react-query';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { NotFoundElement } from '~components/system/not-found.tsx';

// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: 'intent',
    defaultNotFoundComponent: NotFoundElement,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  router.subscribe('onBeforeLoad', ({ fromLocation, pathChanged }) => {
    fromLocation && pathChanged && nprogress.start();
  });
  router.subscribe('onLoad', () => {
    nprogress.complete();
  });

  return router;
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
