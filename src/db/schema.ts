import { timestamp as _timestamp, pgTable, text } from 'drizzle-orm/pg-core';
import { ulid as genUlid0 } from 'ulid';

export * from './auth-schema';

/** ================== utils ================== */
function timestamp(name?: string) {
  if (!name) {
    return _timestamp({ withTimezone: true, mode: 'date' });
  }
  return _timestamp(name, { withTimezone: true, mode: 'date' });
}

function genUlid() {
  return genUlid0().toLowerCase();
}

function ulid(name?: string) {
  if (!name) {
    return text();
  } else {
    return text(name);
  }
}

const createdAt = timestamp('created_at').notNull().defaultNow();
const updatedAt = timestamp('updated_at')
  .notNull()
  .defaultNow()
  // use sql`now()` if https://github.com/drizzle-team/drizzle-orm/issues/2388 get fixed
  .$onUpdate(() => new Date());
// const deletedAt = timestamp("deleted_at");

// const RESTRICT = { onUpdate: "restrict", onDelete: "restrict" } as const;
// const CASCADE = { onUpdate: "cascade", onDelete: "cascade" } as const;

export const demoThings = pgTable('demo_things', {
  id: ulid().$defaultFn(genUlid).primaryKey(),
  name: text().notNull(),
  description: text(),
  createdAt,
  updatedAt,
});
