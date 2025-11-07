import { createRouter } from '@tanstack/react-router';
import { nprogress } from '@mantine/nprogress';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  router.subscribe('onBeforeLoad', ({ fromLocation, pathChanged }) => {
    fromLocation && pathChanged && nprogress.start();
  });
  router.subscribe('onLoad', () => {
    nprogress.complete();
  });

  return router;
};
