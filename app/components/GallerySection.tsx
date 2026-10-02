"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/* =========================================================
   TYPES
========================================================= */

type GalleryImage = {
  type: "image";
  src: string;
  alt: string;
};

type GalleryVideo = {
  type: "video";
  src: string;
  alt: string;
};

type GalleryMedia = GalleryImage | GalleryVideo;

type GalleryGroup = {
  media: GalleryMedia[];
};

type GalleryTab = "photos" | "videos";

/* =========================================================
   GALLERY MEDIA
========================================================= */

const galleryGroups: GalleryGroup[] = [
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

/* =========================================================
   SEPARATE PHOTOS / VIDEOS
========================================================= */

const allMedia = galleryGroups.flatMap((group) => group.media);

const photos = allMedia.filter(
  (item): item is GalleryImage => item.type === "image"
);

const videos = allMedia.filter(
  (item): item is GalleryVideo => item.type === "video"
);

/* =========================================================
   MULTILANGUAGE COPY
========================================================= */

const galleryCopy = {
  en: {
    eyebrow: "FROM THE TRAIL",
    line1: "RIDE. EXPLORE.",
    line2: "REMEMBER.",
    description:
      "A glimpse into the trails, mountains, forests and unforgettable moments from our enduro adventures in Romania.",

    photos: "PHOTOS",
    videos: "VIDEOS",

    photosAria: "Show gallery photos",
    videosAria: "Show gallery videos",

    openPhoto: "Open photo in zoom mode",
    previous: "Show previous photo",
    next: "Show next photo",
    close: "Close photo zoom",
  },

  ro: {
    eyebrow: "DE PE TRASEE",
    line1: "TRĂIEȘTE. EXPLOREAZĂ.",
    line2: "AMINTEȘTE-ȚI.",
    description:
      "O privire asupra traseelor, munților, pădurilor și momentelor de neuitat din aventurile noastre enduro din România.",

    photos: "FOTOGRAFII",
    videos: "VIDEO",

    photosAria: "Arată fotografiile din galerie",
    videosAria: "Arată videoclipurile din galerie",

    openPhoto: "Deschide fotografia în modul zoom",
    previous: "Arată fotografia anterioară",
    next: "Arată fotografia următoare",
    close: "Închide modul zoom",
  },

  de: {
    eyebrow: "VON DEN TRAILS",
    line1: "FAHREN. ENTDECKEN.",
    line2: "ERINNERN.",
    description:
      "Ein Einblick in die Trails, Berge, Wälder und unvergesslichen Momente unserer Enduro-Abenteuer in Rumänien.",

    photos: "FOTOS",
    videos: "VIDEOS",

    photosAria: "Galeriefotos anzeigen",
    videosAria: "Galerievideos anzeigen",

    openPhoto: "Foto im Zoom-Modus öffnen",
    previous: "Vorheriges Foto anzeigen",
    next: "Nächstes Foto anzeigen",
    close: "Foto-Zoom schließen",
  },

  es: {
    eyebrow: "DESDE LOS SENDEROS",
    line1: "CONDUCE. EXPLORA.",
    line2: "RECUERDA.",
    description:
      "Una mirada a los senderos, montañas, bosques y momentos inolvidables de nuestras aventuras de enduro en Rumanía.",

    photos: "FOTOS",
    videos: "VÍDEOS",

    photosAria: "Mostrar fotos de la galería",
    videosAria: "Mostrar vídeos de la galería",

    openPhoto: "Abrir foto en modo zoom",
    previous: "Mostrar foto anterior",
    next: "Mostrar foto siguiente",
    close: "Cerrar zoom de foto",
  },
} as const;

/* =========================================================
   LIGHTBOX
========================================================= */

type GalleryLightboxProps = {
  images: GalleryImage[];
  currentIndex: number;

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;

  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
};

function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onSelect,
  previousLabel,
  nextLabel,
  closeLabel,
}: GalleryLightboxProps) {
  const currentImage = images[currentIndex];

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

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        originalOverflow;
    };
  }, [onClose, onPrevious, onNext]);

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* CLOSE */}

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
          {/* PREVIOUS */}

          {images.length > 1 && (
            <button
              type="button"
              className="
                gallery-lightbox-arrow
                gallery-lightbox-arrow-left
              "
              onClick={onPrevious}
              aria-label={previousLabel}
            >
              ←
            </button>
          )}

          {/* IMAGE */}

          <div className="gallery-lightbox-content">
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="100vw"
              className="gallery-lightbox-image"
              priority
            />
          </div>

          {/* NEXT */}

          {images.length > 1 && (
            <button
              type="button"
              className="
                gallery-lightbox-arrow
                gallery-lightbox-arrow-right
              "
              onClick={onNext}
              aria-label={nextLabel}
            >
              →
            </button>
          )}
        </div>

        {/* COUNTER */}

        <div className="gallery-lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>

        {/* THUMBNAILS */}

        <div
          className="gallery-lightbox-thumbnails"
          aria-label="Photo thumbnails"
        >
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className={`gallery-lightbox-thumb ${
                index === currentIndex
                  ? "active"
                  : ""
              }`}
              onClick={() => onSelect(index)}
              aria-label={image.alt}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="90px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY SECTION
========================================================= */

export default function GallerySection() {
  const { language } = useLanguage();

  const copy = galleryCopy[language];

  const [activeTab, setActiveTab] =
    useState<GalleryTab>("photos");

  const [
    currentPhotoIndex,
    setCurrentPhotoIndex,
  ] = useState(0);

  const [
    isLightboxOpen,
    setIsLightboxOpen,
  ] = useState(false);

  /* -------------------------------------------------------
     OPEN PHOTO
  ------------------------------------------------------- */

  const openPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  /* -------------------------------------------------------
     CLOSE
  ------------------------------------------------------- */

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  /* -------------------------------------------------------
     PREVIOUS
  ------------------------------------------------------- */

  const showPrevious = () => {
    setCurrentPhotoIndex((current) =>
      current === 0
        ? photos.length - 1
        : current - 1
    );
  };

  /* -------------------------------------------------------
     NEXT
  ------------------------------------------------------- */

  const showNext = () => {
    setCurrentPhotoIndex(
      (current) =>
        (current + 1) % photos.length
    );
  };

  return (
    <section
      className="gallery-section"
      id="gallery"
    >
      <div className="container">
        {/* HEADING */}

        <div className="gallery-heading">
          <div className="eyebrow">
            {copy.eyebrow}
          </div>

          <h2>
            {copy.line1}

            <br />

            <span>{copy.line2}</span>
          </h2>

          <p>
            {copy.description}
          </p>
        </div>

        {/* =================================================
            PHOTOS / VIDEOS MENU
        ================================================= */}

        <div
          className="gallery-media-tabs"
          role="tablist"
          aria-label="Gallery media type"
        >
          {/* PHOTOS */}

          <button
            type="button"
            role="tab"
            aria-selected={
              activeTab === "photos"
            }
            aria-label={copy.photosAria}
            className={`gallery-media-tab ${
              activeTab === "photos"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("photos")
            }
          >
            {copy.photos}

            <span>
              {photos.length}
            </span>
          </button>

          {/* VIDEOS */}

          <button
            type="button"
            role="tab"
            aria-selected={
              activeTab === "videos"
            }
            aria-label={copy.videosAria}
            className={`gallery-media-tab ${
              activeTab === "videos"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("videos")
            }
          >
            {copy.videos}

            <span>
              {videos.length}
            </span>
          </button>
        </div>

        {/* =================================================
            PHOTOS
        ================================================= */}

        {activeTab === "photos" ? (
          <div
            className="gallery-photo-grid"
            role="tabpanel"
          >
            {photos.map(
              (photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className="gallery-photo-card"
                  onClick={() =>
                    openPhoto(index)
                  }
                  aria-label={`${copy.openPhoto}: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="
                      (max-width: 650px) 100vw,
                      (max-width: 1000px) 50vw,
                      33vw
                    "
                  />

                  <span
                    className="gallery-photo-zoom"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              )
            )}
          </div>
        ) : (
          /* ===============================================
             VIDEOS
          =============================================== */

          <div
            className="gallery-video-grid"
            role="tabpanel"
          >
            {videos.map((video) => (
              <article
                key={video.src}
                className="gallery-video-card"
              >
                <video
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.alt}
                />

                <div className="gallery-video-caption">
                  {video.alt}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* =================================================
          PHOTO LIGHTBOX
      ================================================= */}

      {isLightboxOpen && (
        <GalleryLightbox
          images={photos}
          currentIndex={
            currentPhotoIndex
          }
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
          onSelect={
            setCurrentPhotoIndex
          }
          previousLabel={
            copy.previous
          }
          nextLabel={copy.next}
          closeLabel={copy.close}
        />
      )}
    </section>
  );
}