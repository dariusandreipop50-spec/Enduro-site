"use client";

import { FormEvent, useState } from "react";
import GallerySection from "./components/GallerySection";
import PackageSection, {
  packageIds,
} from "./components/PackageSection";
import ReviewsSection from "./components/ReviewsSection";
import { useLanguage } from "./i18n/LanguageContext";
import { contactInfo } from "./contactInfo";

export default function Home() {
  const { t } = useLanguage();

  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function choosePackage(id: string) {
    setSelectedPackage(id);

    window.setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      experience: formData.get("experience"),
      tourPackage: formData.get("tourPackage"),
      details: formData.get("details"),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Booking request could not be sent.");
      }

      alert(t("home.booking.success"));

      form.reset();
      setSelectedPackage("");
    } catch (error) {
      console.error(error);

      alert(
        "The booking request could not be sent. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* =====================================================
          HOME / HERO
      ====================================================== */}

      <header className="hero" id="home">
        <div className="container">
          <div className="hero-copy">
            <div className="eyebrow">
              {t("home.hero.eyebrow")}
            </div>

            <h1>
              {t("home.hero.titleStart")}{" "}
              <span className="red">
                {t("home.hero.titleAccent")}
              </span>

              <span className="smallline">
                {t("home.hero.titleLine")}
              </span>
            </h1>

            <div className="green-slash" />

            <p>{t("home.hero.copy")}</p>

            <div className="hero-buttons">
              <a
                className="cta red"
                href="#booking"
              >
                {t("home.hero.book")}&nbsp; ›
              </a>

              <a
                className="cta green-outline"
                href="#tours"
              >
                {t("home.hero.explore")}
              </a>
            </div>
          </div>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <div className="ico">◆</div>

            {t("home.hero.feature1a")}
            <br />
            {t("home.hero.feature1b")}
          </div>

          <div className="hero-feature">
            <div className="ico">▲</div>

            {t("home.hero.feature2a")}
            <br />
            {t("home.hero.feature2b")}
          </div>
        </div>
      </header>

      {/* =====================================================
          EXPERIENCE HIGHLIGHTS
      ====================================================== */}

      <section
        className="experience-strip"
        aria-label={t("home.highlights.aria")}
      >
        <div className="container experience-grid">
          <div className="experience-item">
            <strong>
              {t("home.highlights.trailTitle")}
            </strong>

            <span>
              {t("home.highlights.trailText")}
            </span>
          </div>

          <div className="experience-item">
            <strong>
              {t("home.highlights.inclusiveTitle")}
            </strong>

            <span>
              {t("home.highlights.inclusiveText")}
            </span>
          </div>

          <div className="experience-item">
            <strong>
              {t("home.highlights.tailoredTitle")}
            </strong>

            <span>
              {t("home.highlights.tailoredText")}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOURS / PACKAGES
      ====================================================== */}

      <PackageSection onSelectPackage={choosePackage} />

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        className="about-preview"
        id="about"
      >
        <div className="container about-preview-grid">
          <div
            className="about-preview-image"
            aria-hidden="true"
          />

          <div className="about-preview-copy">
            <div className="eyebrow">
              {t("home.aboutPreview.eyebrow")}
            </div>

            <h2>
              {t("home.aboutPreview.titleA")}
              <br />

              <span>
                {t("home.aboutPreview.titleB")}
              </span>
            </h2>

            <p>
              {t("home.aboutPreview.copy")}
            </p>

            <a
              className="text-link"
              href="#booking"
            >
              {t("home.aboutPreview.link")}
              &nbsp; ›
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <GallerySection />

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      <ReviewsSection />

      {/* =====================================================
          CONTACT / BOOKING
      ====================================================== */}

      <section
        id="contact"
        className="booking-section"
      >
        <div
          className="container booking-layout"
          id="booking"
        >
          {/* LEFT SIDE — CONTACT */}

          <div className="booking-copy">
            <div className="eyebrow">
              {t("home.booking.eyebrow")}
            </div>

            <h2>
              {t("home.booking.titleA")}
              <br />

              <span>
                {t("home.booking.titleB")}
              </span>
            </h2>

            <p>
              {t("home.booking.copy")}
            </p>

            <div className="contact-methods">
              <a
                href={`https://wa.me/${contactInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <span className="contact-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.13 1.59 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.73 1.46h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.17-3.44-8.42ZM12.06 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.23-.38a9.87 9.87 0 1 1 8.39 4.65Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                </span>

                <div>
                  <span>
                    {t("contact.whatsapp")}
                  </span>

                  <strong>
                    {t("contact.message")}
                  </strong>
                </div>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="contact-method"
              >
                <span className="contact-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.5h19a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-19A1.5 1.5 0 0 1 1 18V6a1.5 1.5 0 0 1 1.5-1.5Zm.3 2.3 8.45 6.4a1.25 1.25 0 0 0 1.5 0l8.45-6.4V6.5H2.8v.3Zm18.2 2.5-7.1 5.37a3.25 3.25 0 0 1-3.9 0L3 9.3V18h18V9.3Z" />
                  </svg>
                </span>

                <div>
                  <span>
                    {t("contact.email")}
                  </span>

                  <strong>
                    {contactInfo.email}
                  </strong>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — BOOKING FORM */}

          <div className="booking-box">
            <form onSubmit={handleBooking}>
              <input
                required
                name="fullName"
                placeholder={t("home.booking.fullName")}
                aria-label={t("home.booking.fullName")}
              />

              <input
                required
                name="email"
                type="email"
                placeholder={t("home.booking.email")}
                aria-label={t("home.booking.email")}
              />

              <select
                required
                name="experience"
                defaultValue=""
                aria-label={t("home.booking.experience")}
              >
                <option
                  value=""
                  disabled
                >
                  {t("home.booking.experience")}
                </option>

                <option value="beginner">
                  {t("home.booking.beginner")}
                </option>

                <option value="intermediate">
                  {t("home.booking.intermediate")}
                </option>

                <option value="advanced">
                  {t("home.booking.advanced")}
                </option>
              </select>

              <select
                required
                name="tourPackage"
                value={selectedPackage}
                onChange={(event) =>
                  setSelectedPackage(event.target.value)
                }
                aria-label={t("home.booking.tourPackage")}
              >
                <option
                  value=""
                  disabled
                >
                  {t("home.booking.tourPackage")}
                </option>

                {packageIds.map((id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {t(`home.packages.items.${id}.name`)}
                  </option>
                ))}
              </select>

              <textarea
                name="details"
                placeholder={t("home.booking.details")}
                aria-label={t("home.booking.details")}
              />

              <button
                type="submit"
                className="cta red booking-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "SENDING..."
                  : t("home.booking.submit")}

                {!isSubmitting && <>&nbsp; ›</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
