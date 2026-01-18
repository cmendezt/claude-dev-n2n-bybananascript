# Database Configuration

This project was created without a database configuration.

## Adding a Database Later

You can add a database at any time by:

1. Running `/dev-pipeline:config` and selecting a database option
2. Or manually installing and configuring one of these options:

### Option 1: Supabase (Recommended for quick setup)

```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabase.ts` and add your Supabase credentials to `.env`.

### Option 2: PostgreSQL with Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

### Option 3: PostgreSQL with Drizzle

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

### Option 4: MongoDB with Mongoose

```bash
npm install mongoose
```

### Option 5: Firebase

```bash
npm install firebase
```

## Environment Variables

After choosing a database, add the appropriate environment variables to your `.env` file:

- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **PostgreSQL**: `DATABASE_URL`
- **MongoDB**: `MONGODB_URI`
- **Firebase**: `NEXT_PUBLIC_FIREBASE_*` variables

## Updating Pipeline Config

After adding a database, update your `.claude/pipeline-config.yaml`:

```yaml
database:
  type: supabase  # or postgresql, mongodb, firebase
  # Add type-specific config here
```

This ensures the dev-pipeline agents understand your database setup.
