# Reviews integration

The homepage includes an aggregated Reviews section and `/api/reviews` endpoint.

## Google

Set `GOOGLE_PLACES_API_KEY`. The API route already contains the current Google place ID for Adventure Enduro Tours Romania, and it can be overridden with `GOOGLE_PLACE_ID`.

The route uses Google Places API (New) Place Details with a field mask for reviews.

## Booking.com

Set both `BOOKING_HOTEL_ID` and `BOOKING_REVIEW_JWT`.

This integration uses Booking.com's Guest Reviews API. A Booking.com Connectivity relationship with Guest Reviews access is required.

## Facebook, Instagram and additional sources

Set `SOCIAL_REVIEWS_FEEDS` to one or more comma-separated HTTPS JSON feeds. This is intended for a social-review aggregator, webhook worker, CMS endpoint, or a small server function that has the platform permissions needed to read the relevant social content.

Accepted payloads:

```json
[
  {
    "id": "fb-123",
    "source": "Facebook",
    "author": "Rider name",
    "rating": 5,
    "text": "Review text",
    "date": "2026-08-10",
    "url": "https://..."
  }
]
```

or:

```json
{ "reviews": [ ... ] }
```

If no live feed is configured, the page shows two paraphrased public Tripadvisor review previews so the layout is never empty.
