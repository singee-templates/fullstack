import { ulid as genUlid0 } from 'ulid';
import { db, schema } from '../src/db';

function genUlid() {
  return genUlid0().toLowerCase();
}

// // Small reproducible PRNG for deterministic sampling (M2M/random votes/random subscriptions)
// function makePrng(seedNum = 42) {
//   let s = seedNum >>> 0;
//   return () => {
//     // xorshift32
//     s ^= s << 13;
//     s ^= s >>> 17;
//     s ^= s << 5;
//     return (s >>> 0) / 0xffffffff;
//   };
// }

// Clear the database in dependency-safe order
async function clearDatabase() {
  console.log('🧹 Clearing existing data...');

  // Deletion order matters: remove child tables before parent tables
  await db.delete(schema.demoThings);

  console.log('✅ Database cleared');
}

const sampleDemoThings = [
  {
    name: 'Widget Alpha',
    description: 'A versatile component for dashboard layouts',
  },
  {
    name: 'Data Connector',
    description: 'Bridges external APIs with internal systems',
  },
  {
    name: 'Report Generator',
    description: 'Creates automated PDF reports from templates',
  },
  {
    name: 'Task Scheduler',
    description: 'Manages recurring jobs and background processes',
  },
  {
    name: 'Notification Hub',
    description: 'Centralized service for push and email alerts',
  },
  {
    name: 'File Processor',
    description: 'Handles batch uploads and format conversions',
  },
  {
    name: 'Analytics Engine',
    description: 'Tracks user behavior and generates insights',
  },
  {
    name: 'Cache Manager',
    description: 'Optimizes data retrieval with smart caching',
  },
  {
    name: 'Auth Gateway',
    description: 'Provides SSO and token-based authentication',
  },
  {
    name: 'Search Indexer',
    description: 'Powers full-text search across all content',
  },
];

async function seedDemoThings() {
  console.log('📦 Inserting demo things...');

  const seededDemoThings = await db
    .insert(schema.demoThings)
    .values(
      sampleDemoThings.map((thing) => ({
        id: genUlid(),
        name: thing.name,
        description: thing.description,
      })),
    )
    .returning({ id: schema.demoThings.id, name: schema.demoThings.name });

  console.log(`✅ Seeded ${seededDemoThings.length} demo things`);
}

async function main() {
  await clearDatabase();

  await seedDemoThings();

  console.log('🎉 Finished seeding all apps!');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
