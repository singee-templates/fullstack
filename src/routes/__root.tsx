import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Toaster } from 'sonner';
import { NavigationProgress } from '@mantine/nprogress';
import { ModalsProvider } from '@mantine/modals';
import type { QueryClient } from '@tanstack/react-query';
import appCss from '~styles.css?url';
import { appCssVariablesResolver, appTheme } from '~ui/theme';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider
          theme={appTheme}
          cssVariablesResolver={appCssVariablesResolver}
          defaultColorScheme="light"
        >
          <ModalsProvider>{children}</ModalsProvider>

          <Toaster position="top-center" richColors />
          <NavigationProgress />
        </MantineProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'React Query',
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
