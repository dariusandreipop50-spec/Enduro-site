# Adventure Tours — Enduro in Transylvania

Next.js site for guided enduro tours around Sighișoara and Transylvania.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Languages

The site includes a persistent language selector for English (EN), Romanian (RO), German (DE), and Spanish (ES). Browser-language detection is supported for all four languages.

## Review feeds

The homepage includes an aggregated review section. Copy `.env.example` to `.env.local` and add the credentials/feeds you want to use.

- Google Places API (New): `GOOGLE_PLACES_API_KEY`
- Booking.com Guest Reviews API: `BOOKING_HOTEL_ID` + `BOOKING_REVIEW_JWT`
- Facebook / Instagram / additional sources: `SOCIAL_REVIEWS_FEEDS`

See `REVIEWS_SETUP.md` for the expected feed schema and setup notes.

## Main content

- `app/page.tsx` — homepage, packages, booking form
- `app/about/page.tsx` — commercial About page
- `app/api/reviews/route.ts` — reviews aggregator
- `app/components/ReviewsSection.tsx` — review UI
- `app/globals.css` — global and homepage styling
