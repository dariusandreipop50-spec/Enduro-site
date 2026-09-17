"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type Review = {
  id: string;
  source: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
  url?: string;
};

type ReviewsPayload = {
  reviews: Review[];
  platformLabels?: string[];
};

function stars(rating: number) {
  const count = Math.max(1, Math.min(5, Math.round(rating)));
  return "★★★★★".slice(0, count);
}

export default function ReviewsSection() {
  const { t } = useLanguage();
  const [liveReviews, setLiveReviews] = useState<Review[] | null>(null);
  const [platformLabels, setPlatformLabels] = useState([
    "Google", "Booking.com", "Facebook", "Instagram", "Tripadvisor",
  ]);

  const fallbackReviews = useMemo<Review[]>(() => [
    {
      id: "public-tripadvisor-2026-1",
      source: "Tripadvisor",
      author: t("reviews.fallback1Author"),
      rating: 5,
      date: t("reviews.fallback1Date"),
      text: t("reviews.fallback1Text"),
    },
    {
      id: "public-tripadvisor-2026-2",
      source: "Tripadvisor",
      author: t("reviews.fallback2Author"),
      rating: 5,
      date: t("reviews.fallback2Date"),
      text: t("reviews.fallback2Text"),
    },
  ], [t]);

  useEffect(() => {
    let mounted = true;

    fetch("/api/reviews")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: ReviewsPayload | null) => {
        if (!mounted || !payload) return;
        if (payload.reviews?.length) setLiveReviews(payload.reviews);
        if (payload.platformLabels?.length) setPlatformLabels(payload.platformLabels);
      })
      .catch(() => {
        // Localized public-review previews remain visible if no live feed is configured.
      });

    return () => { mounted = false; };
  }, []);

  const reviews = liveReviews ?? fallbackReviews;

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-heading">
          <div>
            <div className="eyebrow">{t("reviews.eyebrow")}</div>
            <h2>{t("reviews.titleA")} <span>{t("reviews.titleB")}</span></h2>
          </div>
          <p>{t("reviews.intro")}</p>
        </div>

        <div className="review-platforms" aria-label={t("reviews.sourcesAria")}>
          {platformLabels.map((platform) => <span key={platform}>{platform}</span>)}
        </div>

        <div className="reviews-grid">
          {reviews.slice(0, 6).map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card-top">
                <span className="review-source">{review.source}</span>
                <span className="review-stars" aria-label={`${review.rating} ${t("reviews.starsAria")}`}>
                  {stars(review.rating)}
                </span>
              </div>
              <blockquote>“{review.text}”</blockquote>
              <div className="review-author">
                <strong>{review.author}</strong>
                {review.date && <span>{review.date}</span>}
              </div>
              {review.url && (
                <a href={review.url} target="_blank" rel="noreferrer">{t("reviews.original")}&nbsp; ›</a>
              )}
            </article>
          ))}
        </div>

        {!liveReviews && <p className="reviews-note">{t("reviews.note")}</p>}
      </div>
    </section>
  );
}
