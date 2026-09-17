"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export const packageIds = [
  "three",
  "four",
  "week",
  "custom",
] as const;

type PackageId = (typeof packageIds)[number];

type PackageSectionProps = {
  onSelectPackage: (id: PackageId) => void;
};

type DetailPackageId = Exclude<PackageId, "custom">;

const packageDefs = [
  {
    id: "three",
    price: "€890",
    className: "package-three",
  },
  {
    id: "four",
    price: "€1,090",
    className: "package-four",
  },
  {
    id: "week",
    price: "€1,390",
    className: "package-week",
  },
  {
    id: "custom",
    price: "CUSTOM",
    className: "package-custom",
  },
] as const;

export default function PackageSection({
  onSelectPackage,
}: PackageSectionProps) {
  const { t } = useLanguage();

  const [
    selectedDetails,
    setSelectedDetails,
  ] = useState<DetailPackageId | null>(null);

  const packages = useMemo(
    () =>
      packageDefs.map((item) => ({
        ...item,
        name: t(`home.packages.items.${item.id}.name`),
        unit: t(`home.packages.items.${item.id}.unit`),
        meta: t(`home.packages.items.${item.id}.meta`),
        description: t(
          `home.packages.items.${item.id}.description`
        ),
        badge: t(`home.packages.items.${item.id}.badge`),
      })),
    [t]
  );

  const details = useMemo(() => {
    if (!selectedDetails) {
      return null;
    }

    const base = `home.packages.details.${selectedDetails}`;

    return {
      title: t(`${base}.title`),
      price: t(`${base}.price`),

      summary: [
        t(`${base}.summary1`),
        t(`${base}.summary2`),
        t(`${base}.summary3`),
        t(`${base}.summary4`),
      ],

      included: [
        t(`${base}.included1`),
        t(`${base}.included2`),
        t(`${base}.included3`),
        t(`${base}.included4`),
        t(`${base}.included5`),
      ],

      notIncluded: [
        t(`${base}.notIncluded1`),
        t(`${base}.notIncluded2`),
        t(`${base}.notIncluded3`),
        t(`${base}.notIncluded4`),
      ],

      onRequest: [
        t(`${base}.onRequest1`),
        t(`${base}.onRequest2`),
      ],

      note: t(`${base}.note`),
    };
  }, [selectedDetails, t]);

  function openPackage(id: PackageId) {
    if (id === "custom") {
      onSelectPackage(id);
      return;
    }

    setSelectedDetails(id);
  }

  function closeModal() {
    setSelectedDetails(null);
  }

  function bookSelectedPackage() {
    if (!selectedDetails) {
      return;
    }

    const id = selectedDetails;

    closeModal();
    onSelectPackage(id);
  }

  return (
    <>
      <section
        className="packages-section"
        id="tours"
      >
        <div
          className="container"
          id="packages"
        >
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">
                {t("home.packages.eyebrow")}
              </div>

              <h2>
                {t("home.packages.titleA")}{" "}
                <span>
                  {t("home.packages.titleB")}
                </span>
              </h2>
            </div>

            <p>{t("home.packages.intro")}</p>
          </div>

          <div className="package-grid">
            {packages.map((tourPackage) => {
              const hasDetails =
                tourPackage.id !== "custom";

              return (
                <article
                  className={`tour-package ${tourPackage.className} ${
                    hasDetails ? "package-clickable" : ""
                  }`}
                  key={tourPackage.id}
                  onClick={
                    hasDetails
                      ? () => openPackage(tourPackage.id)
                      : undefined
                  }
                  role={hasDetails ? "button" : undefined}
                  tabIndex={hasDetails ? 0 : undefined}
                  onKeyDown={
                    hasDetails
                      ? (event) => {
                          if (
                            event.key === "Enter" ||
                            event.key === " "
                          ) {
                            event.preventDefault();
                            openPackage(tourPackage.id);
                          }
                        }
                      : undefined
                  }
                >
                  <div className="package-overlay" />

                  <div className="package-content">
                    <div className="package-badge">
                      {tourPackage.badge}
                    </div>

                    <h3>{tourPackage.name}</h3>

                    <div className="package-meta">
                      {tourPackage.meta}
                    </div>

                    <p>{tourPackage.description}</p>

                    <div className="package-bottom">
                      <div className="package-price">
                        <strong>{tourPackage.price}</strong>

                        <span>{tourPackage.unit}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openPackage(tourPackage.id);
                        }}
                      >
                        {hasDetails
                          ? t("home.packages.details.viewDetails")
                          : t("home.packages.request")}
                        &nbsp; ›
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="package-note">
            {t("home.packages.note")}
          </p>
        </div>
      </section>

      {details && (
        <div
          className="package-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="package-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="package-modal-close"
              onClick={closeModal}
              aria-label={t("home.packages.details.close")}
            >
              ×
            </button>

            <div className="package-modal-header">
              <div className="eyebrow">
                {t("home.packages.details.modalEyebrow")}
              </div>

              <h2 id="package-modal-title">
                {details.title}
              </h2>

              <div className="package-modal-price">
                {details.price}
              </div>
            </div>

            <div className="package-modal-summary">
              {details.summary.map((item) => (
                <div
                  className="package-summary-item"
                  key={item}
                >
                  <span aria-hidden="true">◆</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="package-modal-columns">
              <div className="package-detail-column">
                <h3 className="included-title">
                  {t("home.packages.details.includedTitle")}
                </h3>

                <ul>
                  {details.included.map((item) => (
                    <li key={item}>
                      <span
                        className="package-check"
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-detail-column">
                <h3 className="not-included-title">
                  {t("home.packages.details.notIncludedTitle")}
                </h3>

                <ul>
                  {details.notIncluded.map((item) => (
                    <li key={item}>
                      <span
                        className="package-cross"
                        aria-hidden="true"
                      >
                        ×
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="package-request-section">
              <h3>
                {t("home.packages.details.onRequestTitle")}
              </h3>

              <div className="package-request-items">
                {details.onRequest.map((item) => (
                  <span key={item}>
                    + {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="package-modal-footer">
              <p>{details.note}</p>

              <button
                type="button"
                className="cta red package-modal-book"
                onClick={bookSelectedPackage}
              >
                {t("home.packages.details.bookButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
