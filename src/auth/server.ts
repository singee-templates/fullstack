import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

// FIXME: We have to use ../db (rather than ~db) here to make @better-auth/cli happy
// See https://github.com/better-auth/better-auth/issues/6373
import { db } from '../db';

// FIXME: We should use import { tanstackStartCookies } from 'better-auth/tanstack-start'
// But it's impossible to do so due to a bug in tanstack-start
// See:
//  - https://github.com/better-auth/better-auth/issues/6341
//  - https://github.com/TanStack/router/issues/5795
import { tanstackStartCookies } from './tanstack-start';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  experimental: { joins: true },
  // advanced: {
  //   ipAddress: {
  //     ipAddressHeaders: ["x-forwarded-for", "cf-connecting-ip"],
  //   },
  // },
  plugins: [
    tanstackStartCookies(), // This should be the last plugin
  ],
});
