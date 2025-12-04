import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

// FIXME: We have to use ../db (rather than ~db) here to make @better-auth/cli happy
// See https://github.com/better-auth/better-auth/issues/6373
import { db } from '../db';

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
