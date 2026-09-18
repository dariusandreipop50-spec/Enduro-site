"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type GalleryMedia =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
    };

type GalleryGroup = {
  media: GalleryMedia[];
};

/*
|--------------------------------------------------------------------------
| GALLERY MEDIA
|--------------------------------------------------------------------------
*/

const galleryGroups: GalleryGroup[] = [
  // SLIDE 1
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-1/photo-01.jpg",
        alt: "Enduro adventure in Romania",
      },
      {
        type: "image",
        src: "/gallery/slide-1/photo-02.jpg",
        alt: "Enduro riding in Transylvania",
      },
      {
        type: "image",
        src: "/gallery/slide-1/photo-03.jpg",
        alt: "Adventure Enduro Tours Romania",
      },
    ],
  },

  // SLIDE 2
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-2/photo-01.jpg",
        alt: "Enduro forest adventure",
      },
      {
        type: "image",
        src: "/gallery/slide-2/photo-02.jpg",
        alt: "Enduro riding through Romania",
      },
      {
        type: "video",
        src: "/gallery/slide-2/video-01.mp4",
        alt: "Enduro riding video",
      },
      {
        type: "image",
        src: "/gallery/slide-2/photo-03.jpg",
        alt: "Romanian enduro trail",
      },
    ],
  },

  // SLIDE 3
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-3/photo-01.jpg",
        alt: "Hard enduro experience",
      },
      {
        type: "image",
        src: "/gallery/slide-3/photo-02.jpg",
        alt: "Off-road motorcycle adventure",
      },
      {
        type: "image",
        src: "/gallery/slide-3/photo-03.jpg",
        alt: "Enduro trail in Transylvania",
      },
    ],
  },

  // SLIDE 4
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-4/photo-01.jpg",
        alt: "Technical enduro riding",
      },
      {
        type: "video",
        src: "/gallery/slide-4/video-01.mp4",
        alt: "Hard enduro action",
      },
      {
        type: "image",
        src: "/gallery/slide-4/photo-02.jpg",
        alt: "Enduro rider in Romania",
      },
      {
        type: "video",
        src: "/gallery/slide-4/video-02.mp4",
        alt: "Enduro trail action",
      },
      {
        type: "image",
        src: "/gallery/slide-4/photo-03.jpg",
        alt: "Enduro adventure trail",
      },
    ],
  },

  // SLIDE 5
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-5/photo-01.jpg",
        alt: "Adventure Enduro Tours",
      },
      {
        type: "image",
        src: "/gallery/slide-5/photo-02.jpg",
        alt: "Romanian off-road adventure",
      },
      {
        type: "image",
        src: "/gallery/slide-5/photo-03.jpg",
        alt: "Enduro motorcycle tour",
      },
    ],
  },

  // SLIDE 6
  {
    media: [
      {
        type: "image",
        src: "/gallery/slide-6/photo-01.jpg",
        alt: "Enduro riders exploring Romania",
      },
      {
        type: "image",
        src: "/gallery/slide-6/photo-02.jpg",
        alt: "Adventure riding in Transylvania",
      },
      {
        type: "video",
        src: "/gallery/slide-6/video-01.mp4",
        alt: "Enduro adventure video",
      },
      {
        type: "image",
        src: "/gallery/slide-6/photo-03.jpg",
        alt: "Enduro experience Romania",
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| MULTILANGUAGE GALLERY COPY
|--------------------------------------------------------------------------
*/

const galleryCopy = {
  en: {
    eyebrow: "FROM THE TRAIL",
    line1: "RIDE. EXPLORE.",
    line2: "REMEMBER.",
    description:
      "A glimpse into the trails, mountains, forests and unforgettable moments from our enduro adventures in Romania.",
    previous: "Show previous gallery item",
    next: "Show next gallery item",
    close: "Close gallery",
    archiveTitle: "GALLERY ARCHIVE",
    archiveNote: "The year archive will be updated as we add the exact photos from each season.",
    comingSoon: "Photos coming soon",
  },

  ro: {
    eyebrow: "DE PE TRASEE",
    line1: "TRĂIEȘTE. EXPLOREAZĂ.",
    line2: "AMINTEȘTE-ȚI.",
    description:
      "O privire asupra traseelor, munților, pădurilor și momentelor de neuitat din aventurile noastre enduro din România.",
    previous: "Arată elementul anterior din galerie",
    next: "Arată următorul element din galerie",
    close: "Închide galeria",
    archiveTitle: "ARHIVA GALERIEI",
    archiveNote: "Arhiva pe ani va fi actualizată pe măsură ce adăugăm fotografiile exacte din fiecare sezon.",
    comingSoon: "Fotografii în curând",
  },

  de: {
    eyebrow: "VON DEN TRAILS",
    line1: "FAHREN. ENTDECKEN.",
    line2: "ERINNERN.",
    description:
      "Ein Einblick in die Trails, Berge, Wälder und unvergesslichen Momente unserer Enduro-Abenteuer in Rumänien.",
    previous: "Vorheriges Galerieelement anzeigen",
    next: "Nächstes Galerieelement anzeigen",
    close: "Galerie schließen",
    archiveTitle: "GALERIE-ARCHIV",
    archiveNote: "Das Jahresarchiv wird aktualisiert, sobald wir die genauen Fotos aus jeder Saison hinzufügen.",
    comingSoon: "Fotos folgen",
  },

  es: {
    eyebrow: "DESDE LOS SENDEROS",
    line1: "CONDUCE. EXPLORA.",
    line2: "RECUERDA.",
    description:
      "Una mirada a los senderos, montañas, bosques y momentos inolvidables de nuestras aventuras de enduro en Rumanía.",
    previous: "Mostrar el elemento anterior de la galería",
    next: "Mostrar el siguiente elemento de la galería",
    close: "Cerrar galería",
    archiveTitle: "ARCHIVO DE GALERÍA",
    archiveNote: "El archivo por años se actualizará a medida que añadamos las fotos exactas de cada temporada.",
    comingSoon: "Fotos próximamente",
  },
} as const;

/*
|--------------------------------------------------------------------------
| GALLERY LIGHTBOX
|--------------------------------------------------------------------------
*/

type GalleryLightboxProps = {
  media: GalleryMedia[];
  currentIndex: number;
  yearGroups: {
    year: string;
    media: GalleryMedia[];
    temporary?: boolean;
  }[];
  activeYear: string;
  onYearChange: (year: string) => void;
  onMediaSelect: (index: number) => void;
  archiveTitle: string;
  archiveNote: string;
  comingSoon: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
};

function GalleryLightbox({
  media,
  currentIndex,
  yearGroups,
  activeYear,
  onYearChange,
  onMediaSelect,
  archiveTitle,
  archiveNote,
  comingSoon,
  onClose,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  closeLabel,
}: GalleryLightboxProps) {
  const currentMedia = media[currentIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={currentMedia?.alt || archiveTitle}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        ×
      </button>

      <div className="gallery-lightbox-main">
        <div className="gallery-lightbox-media-row">
          <button
            type="button"
            className="gallery-lightbox-arrow gallery-lightbox-arrow-left"
            onClick={onPrevious}
            aria-label={previousLabel}
          >
            ←
          </button>

          <div className="gallery-lightbox-content">
            {currentMedia?.type === "image" ? (
              <Image
                key={currentMedia.src}
                src={currentMedia.src}
                alt={currentMedia.alt}
                fill
                sizes="100vw"
                className="gallery-lightbox-image"
                priority
              />
            ) : currentMedia ? (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                className="gallery-lightbox-video"
                controls
                autoPlay
                muted
                playsInline
              />
            ) : null}
          </div>

          <button
            type="button"
            className="gallery-lightbox-arrow gallery-lightbox-arrow-right"
            onClick={onNext}
            aria-label={nextLabel}
          >
            →
          </button>
        </div>

        <div className="gallery-lightbox-counter">
          {currentIndex + 1} / {media.length}
        </div>

        <div className="gallery-archive">
          <div className="gallery-archive-heading">
            <span>{archiveTitle}</span>
            <p>{archiveNote}</p>
          </div>

          <div className="gallery-year-tabs" role="tablist" aria-label={archiveTitle}>
            {yearGroups.map((group) => (
              <button
                key={group.year}
                type="button"
                className={`gallery-year-tab ${
                  activeYear === group.year ? "active" : ""
                }`}
                onClick={() => onYearChange(group.year)}
                role="tab"
                aria-selected={activeYear === group.year}
              >
                {group.year}
              </button>
            ))}
          </div>

          <div className="gallery-year-content">
            {yearGroups.map((group) =>
              activeYear === group.year ? (
                <div key={group.year} className="gallery-year-panel">
                  {group.media.length > 0 ? (
                    <div className="gallery-year-thumbnails">
                      {group.media.map((item, index) => (
                        <button
                          key={`${group.year}-${item.src}`}
                          type="button"
                          className={`gallery-year-thumbnail ${
                            media[currentIndex]?.src === item.src ? "active" : ""
                          }`}
                          onClick={() => {
                            const targetIndex = media.findIndex(
                              (mediaItem) => mediaItem.src === item.src
                            );

                            if (targetIndex >= 0) {
                              onMediaSelect(targetIndex);
                            }
                          }}
                          aria-label={item.alt}
                        >
                          {item.type === "image" ? (
                            <Image
                              src={item.src}
                              alt=""
                              fill
                              sizes="120px"
                            />
                          ) : (
                            <video
                              src={item.src}
                              muted
                              playsInline
                              preload="metadata"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="gallery-year-empty">
                      <strong>{group.year}</strong>
                      <span>{comingSoon}</span>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| GALLERY SECTION
|--------------------------------------------------------------------------
*/

export default function GallerySection() {
  const { language } = useLanguage();

  const copy = galleryCopy[language];

  const allMedia = galleryGroups.flatMap((group) => group.media);

  /*
   * TEMPORARY YEAR ARCHIVE
   *
   * We do not yet have the exact photos for every year.
   * For now, the existing gallery media is placed under 2026
   * so the archive UI is already ready.
   *
   * When the real yearly photos are available, only these arrays
   * need to be changed.
   */
  const yearGroups = [
    {
      year: "2026",
      media: allMedia,
      temporary: true,
    },
    {
      year: "2025",
      media: [],
    },
    {
      year: "2024",
      media: [],
    },
    {
      year: "2023",
      media: [],
    },
  ];

  const [activeYear, setActiveYear] = useState("2026");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentMedia = allMedia[currentIndex];

  const showPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? allMedia.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((current) => (current + 1) % allMedia.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleYearChange = (year: string) => {
    setActiveYear(year);

    const selectedGroup = yearGroups.find((group) => group.year === year);

    if (selectedGroup?.media.length) {
      const firstMediaSrc = selectedGroup.media[0].src;
      const firstMediaIndex = allMedia.findIndex(
        (media) => media.src === firstMediaSrc
      );

      setCurrentIndex(firstMediaIndex >= 0 ? firstMediaIndex : 0);
    }
  };

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-heading">
          <div className="eyebrow">{copy.eyebrow}</div>

          <h2>
            {copy.line1}
            <br />
            <span>{copy.line2}</span>
          </h2>

          <p>{copy.description}</p>
        </div>

        <button
          type="button"
          className="gallery-single-item gallery-clickable-item"
          onClick={openLightbox}
          aria-label={currentMedia.alt}
        >
          <div className="gallery-media-wrapper" id="gallery">
            {currentMedia.type === "image" ? (
              <Image
                key={currentMedia.src}
                src={currentMedia.src}
                alt={currentMedia.alt}
                fill
                sizes="(max-width: 600px) 100vw, 100vw"
                priority
              />
            ) : (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={currentMedia.alt}
              />
            )}

          </div>
        </button>
      </div>

      {isLightboxOpen && (
        <GalleryLightbox
          media={allMedia}
          currentIndex={currentIndex}
          yearGroups={yearGroups}
          activeYear={activeYear}
          onYearChange={handleYearChange}
          onMediaSelect={setCurrentIndex}
          archiveTitle={copy.archiveTitle}
          archiveNote={copy.archiveNote}
          comingSoon={copy.comingSoon}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
          previousLabel={copy.previous}
          nextLabel={copy.next}
          closeLabel={copy.close}
        />
      )}
    </section>
  );
}

