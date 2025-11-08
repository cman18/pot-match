# Ballot Match

A free-to-start Next.js app that helps users compare their policy preferences against candidates on their ballot.
Default mode is stateless, using only client localStorage and server API routes. You can enable Postgres plus Prisma later by adding a `DATABASE_URL`.

## Quick start

1. `npm install`
2. copy `.env.example` to `.env.local` and fill in keys
   - `GOOGLE_CIVIC_API_KEY`
   - `DATA_GOV_API_KEY`
   - `OPENFEC_API_KEY`
   - leave `DATABASE_URL` empty for stateless mode
3. `npm run dev` and open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub
2. Import on Vercel and add the three keys above as Environment Variables
3. Deploy

## Optional database mode

1. Create a free Neon Postgres database and set `DATABASE_URL`
2. Run `npm run db:push`
3. Redeploy. The app will start reading and writing to Postgres where applicable

## Notes

- The current candidate vector builder is stubbed. You can replace it with live mappings from Congress.gov and OpenFEC in `lib/candidates.ts` and the API routes under `app/api`.
- All scoring is transparent and uses cosine similarity with a coverage-based confidence adjustment.
