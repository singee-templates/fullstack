import { createServerOnlyFn } from '@tanstack/react-start';
import { createAuthMiddleware } from 'better-auth/plugins';
import { parseSetCookieHeader } from './utils';
import type { BetterAuthPlugin } from 'better-auth';

export const tanstackStartCookies = () =>
  createServerOnlyFn(() => ({
    id: 'tanstack-start-cookie',
    hooks: {
      after: [
        {
          matcher() {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.responseHeaders;

            if ('_flag' in ctx && ctx._flag === 'router') return;

            if (returned instanceof Headers) {
              const setCookies = returned.get('set-cookie');
              if (!setCookies) return;

              const parsed = parseSetCookieHeader(setCookies);
              const { setCookie } =
                await import('@tanstack/react-start/server');

              parsed.forEach((value, key) => {
                if (!key) return;
                const opts = {
                  sameSite: value.samesite,
                  secure: value.secure,
                  maxAge: value['max-age'],
                  httpOnly: value.httponly,
                  domain: value.domain,
                  path: value.path,
                } as const;
                try {
                  setCookie(key, decodeURIComponent(value.value), opts);
                } catch (_) {
                  /* empty */
                }
              });
              return;
            }
          }),
        },
      ],
    },
  }))() satisfies BetterAuthPlugin;
