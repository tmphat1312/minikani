import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: './src/db.sqlite',
  },
  schema: './src/schema.ts',
  out: './migrations',
  verbose: true,
  strict: true,
});
