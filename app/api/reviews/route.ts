import { NextResponse } from "next/server";

type NormalizedReview = {
  id: string;
  source: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
  url?: string;
};

type GoogleReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
};

type GooglePlaceResponse = { reviews?: GoogleReview[] };

type BookingReview = {
  review_id?: string;
  content?: { positive?: string; negative?: string; headline?: string };
  scoring?: { review_score?: number };
  reviewer?: { name?: string };
  created_timestamp?: string;
  url?: string;
};

type BookingPayload = { data?: { reviews?: BookingReview[] } };

type SocialReviewInput = {
  id?: string | number;
  source?: string;
  author?: string;
  rating?: number | string;
  text?: string;
  date?: string;
  url?: string;
};

const publicFallback: NormalizedReview[] = [
  {
    id: "public-tripadvisor-2026-1",
    source: "Tripadvisor",
    author: "3-day riding group",
    rating: 5,
    date: "July 2026",
    text: "The team prepared everything around our requests, tailored the route perfectly to the group and supported us throughout the trip. Great guiding, convenient accommodation and an experience we would happily repeat.",
  },
  {
    id: "public-tripadvisor-2026-2",
    source: "Tripadvisor",
    author: "Andrew · London",
    rating: 5,
    date: "January 2026",
    text: "An unforgettable off-road experience: spectacular countryside, warm hospitality, excellent food and a team that made the whole adventure feel special from start to finish.",
  },
];

async function getGoogleReviews(): Promise<NormalizedReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || "ChIJPe3_JHV1S0cRfWx8gUlWvZU";
  if (!apiKey) return [];

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];
    const data = (await response.json()) as GooglePlaceResponse;

    return (data.reviews || [])
      .filter((review) => review.text?.text)
      .map((review, index) => ({
        id: review.name || `google-${index}`,
        source: "Google",
        author: review.authorAttribution?.displayName || "Google reviewer",
        rating: Number(review.rating || 5),
        text: review.text?.text || "",
        date: review.relativePublishTimeDescription || review.publishTime,
        url: review.googleMapsUri || review.authorAttribution?.uri,
      }));
  } catch {
    return [];
  }
}

async function getBookingReviews(): Promise<NormalizedReview[]> {
  const hotelId = process.env.BOOKING_HOTEL_ID;
  const token = process.env.BOOKING_REVIEW_JWT;
  if (!hotelId || !token) return [];

  try {
    const response = await fetch(
      `https://supply-xml.booking.com/review-api/properties/${hotelId}/reviews?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) return [];
    const payload = (await response.json()) as BookingPayload;
    const reviews = payload.data?.reviews || [];

    return reviews
      .map((review, index) => {
        const positive = review.content?.positive?.trim();
        const negative = review.content?.negative?.trim();
        const text = positive || negative || review.content?.headline || "";
        const score = Number(review.scoring?.review_score || 10);

        return {
          id: `booking-${review.review_id || index}`,
          source: "Booking.com",
          author: review.reviewer?.name || "Booking.com guest",
          rating: Math.max(1, Math.min(5, score / 2)),
          text,
          date: review.created_timestamp,
          url: review.url,
        } satisfies NormalizedReview;
      })
      .filter((review) => review.text);
  } catch {
    return [];
  }
}

function normalizeSocialReview(review: SocialReviewInput, index: number): NormalizedReview | null {
  const text = String(review.text || "").trim();
  if (!text) return null;

  return {
    id: String(review.id || `${review.source || "social"}-${index}`),
    source: String(review.source || "Social"),
    author: String(review.author || "Guest"),
    rating: Math.max(1, Math.min(5, Number(review.rating || 5))),
    text,
    date: review.date ? String(review.date) : undefined,
    url: review.url ? String(review.url) : undefined,
  };
}

async function getSocialFeedReviews(): Promise<NormalizedReview[]> {
  const feedUrls = (process.env.SOCIAL_REVIEWS_FEEDS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  if (!feedUrls.length) return [];

  const results = await Promise.all(
    feedUrls.map(async (url) => {
      try {
        const response = await fetch(url, { next: { revalidate: 1800 } });
        if (!response.ok) return [] as NormalizedReview[];
        const payload = (await response.json()) as SocialReviewInput[] | { reviews?: SocialReviewInput[] };
        const rows = Array.isArray(payload) ? payload : payload.reviews || [];

        return rows
          .map(normalizeSocialReview)
          .filter((review): review is NormalizedReview => review !== null);
      } catch {
        return [] as NormalizedReview[];
      }
    })
  );

  return results.flat();
}

export async function GET() {
  const [google, booking, social] = await Promise.all([
    getGoogleReviews(),
    getBookingReviews(),
    getSocialFeedReviews(),
  ]);

  const liveReviews = [...google, ...booking, ...social]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 12);

  return NextResponse.json({
    reviews: liveReviews.length ? liveReviews : publicFallback,
    platformLabels: ["Google", "Booking.com", "Facebook", "Instagram", "Tripadvisor"],
    live: liveReviews.length > 0,
    generatedAt: new Date().toISOString(),
  });
}
