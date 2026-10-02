"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

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

type GalleryMediaItem = GalleryImage | GalleryVideo;

type GalleryMode = "photos" | "videos";

const media2026: GalleryMediaItem[] = [
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
    /* =======================================================
     NEW PHOTOS 2026
  ======================================================= */

  {
    type: "image",
    src: "/gallery/2026/photos/Poza_20.jpeg",
    alt: "Adventure Enduro Tours Romania 20",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_21.jpeg",
    alt: "Adventure Enduro Tours Romania 21",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_22.jpeg",
    alt: "Adventure Enduro Tours Romania 22",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_23.jpeg",
    alt: "Adventure Enduro Tours Romania 23",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_24.jpeg",
    alt: "Adventure Enduro Tours Romania 24",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_25.jpeg",
    alt: "Adventure Enduro Tours Romania 25",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_26.jpeg",
    alt: "Adventure Enduro Tours Romania 26",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_27.jpeg",
    alt: "Adventure Enduro Tours Romania 27",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_28.jpeg",
    alt: "Adventure Enduro Tours Romania 28",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_29.jpeg",
    alt: "Adventure Enduro Tours Romania 29",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_30.jpeg",
    alt: "Adventure Enduro Tours Romania 30",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_31.jpeg",
    alt: "Adventure Enduro Tours Romania 31",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_32.jpeg",
    alt: "Adventure Enduro Tours Romania 32",
  },
  {
    type: "image",
    src: "/gallery/2026/photos/Poza_33.jpeg",
    alt: "Adventure Enduro Tours Romania 33",
  },

  /* =======================================================
     NEW VIDEOS 2026
  ======================================================= */

  {
    type: "video",
    src: "/gallery/2026/videos/Video_1.mp4",
    alt: "Adventure Enduro Tours Romania video 1",
  },
  {
    type: "video",
    src: "/gallery/2026/videos/Video_2.mp4",
    alt: "Adventure Enduro Tours Romania video 2",
  },
  {
    type: "video",
    src: "/gallery/2026/videos/Video_3.mp4",
    alt: "Adventure Enduro Tours Romania video 3",
  },
];

const galleryCopy = {
  en: {
    photosEyebrow: "GALLERY / PHOTOS",
    photosTitle: "PHOTO",
    photosAccent: "ARCHIVE.",
    videosEyebrow: "GALLERY / VIDEOS",
    videosTitle: "VIDEO",
    videosAccent: "ARCHIVE.",
    description:
      "Explore the moments, trails and experiences from our enduro tours in Transylvania.",
    archive: "ARCHIVE",
    comingSoon: "Coming soon",
    photos: "PHOTOS",
    videos: "VIDEOS",
    close: "Close photo",
    previous: "Previous photo",
    next: "Next photo",
  },

  ro: {
    photosEyebrow: "GALERIE / FOTOGRAFII",
    photosTitle: "ARHIVA",
    photosAccent: "FOTO.",
    videosEyebrow: "GALERIE / VIDEO",
    videosTitle: "ARHIVA",
    videosAccent: "VIDEO.",
    description:
      "Descoperă momentele, traseele și experiențele din turele noastre enduro din Transilvania.",
    archive: "ARHIVĂ",
    comingSoon: "În curând",
    photos: "FOTOGRAFII",
    videos: "VIDEO",
    close: "Închide fotografia",
    previous: "Fotografia anterioară",
    next: "Fotografia următoare",
  },

  de: {
    photosEyebrow: "GALERIE / FOTOS",
    photosTitle: "FOTO",
    photosAccent: "ARCHIV.",
    videosEyebrow: "GALERIE / VIDEOS",
    videosTitle: "VIDEO",
    videosAccent: "ARCHIV.",
    description:
      "Entdecke Momente, Trails und Erlebnisse unserer Enduro-Touren in Transsilvanien.",
    archive: "ARCHIV",
    comingSoon: "Demnächst",
    photos: "FOTOS",
    videos: "VIDEOS",
    close: "Foto schließen",
    previous: "Vorheriges Foto",
    next: "Nächstes Foto",
  },

  es: {
    photosEyebrow: "GALERÍA / FOTOS",
    photosTitle: "ARCHIVO",
    photosAccent: "FOTO.",
    videosEyebrow: "GALERÍA / VÍDEOS",
    videosTitle: "ARCHIVO",
    videosAccent: "VÍDEO.",
    description:
      "Descubre los momentos, senderos y experiencias de nuestros tours de enduro en Transilvania.",
    archive: "ARCHIVO",
    comingSoon: "Próximamente",
    photos: "FOTOS",
    videos: "VÍDEOS",
    close: "Cerrar foto",
    previous: "Foto anterior",
    next: "Foto siguiente",
  },
} as const;

export default function GalleryMediaPage({
  mode,
}: {
  mode: GalleryMode;
}) {
  const { language } = useLanguage();

  const text = galleryCopy[language];

  const [activeYear, setActiveYear] = useState<"2026" | "2025">(
    "2026"
  );

  const [photoIndex, setPhotoIndex] = useState<number | null>(
    null
  );

  const yearMedia =
    activeYear === "2026"
      ? media2026
      : [];

  const visibleMedia = yearMedia.filter((item) =>
    mode === "photos"
      ? item.type === "image"
      : item.type === "video"
  );

  const photos = visibleMedia.filter(
    (item): item is GalleryImage =>
      item.type === "image"
  );

  const currentPhoto =
    photoIndex !== null
      ? photos[photoIndex]
      : null;

  const closeLightbox = () => {
    setPhotoIndex(null);
  };

  const previousPhoto = () => {
    if (
      photoIndex === null ||
      photos.length === 0
    ) {
      return;
    }

    setPhotoIndex(
      photoIndex === 0
        ? photos.length - 1
        : photoIndex - 1
    );
  };

  const nextPhoto = () => {
    if (
      photoIndex === null ||
      photos.length === 0
    ) {
      return;
    }

    setPhotoIndex(
      (photoIndex + 1) %
        photos.length
    );
  };

  useEffect(() => {
    if (photoIndex === null) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setPhotoIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setPhotoIndex((current) => {
          if (current === null) {
            return null;
          }

          return current === 0
            ? photos.length - 1
            : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setPhotoIndex((current) => {
          if (current === null) {
            return null;
          }

          return (
            (current + 1) %
            photos.length
          );
        });
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        originalOverflow;
    };
  }, [photoIndex, photos.length]);

  return (
    <main className="gallery-page">
      <div className="container">
        <header className="gallery-page-header">
          <div className="eyebrow">
            {mode === "photos"
              ? text.photosEyebrow
              : text.videosEyebrow}
          </div>

          <h1>
            {mode === "photos"
              ? text.photosTitle
              : text.videosTitle}

            <br />

            <span>
              {mode === "photos"
                ? text.photosAccent
                : text.videosAccent}
            </span>
          </h1>

          <p>{text.description}</p>

          <div className="gallery-page-switcher">
            <Link
              href="/gallery/photos"
              className={
                mode === "photos"
                  ? "active"
                  : ""
              }
            >
              {text.photos}
            </Link>

            <Link
              href="/gallery/videos"
              className={
                mode === "videos"
                  ? "active"
                  : ""
              }
            >
              {text.videos}
            </Link>
          </div>
        </header>

        <section className="gallery-page-archive">
          <div className="gallery-page-archive-top">
            <span>
              {text.archive}
            </span>

            <div className="gallery-page-years">
              <button
                type="button"
                className={
                  activeYear === "2026"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setActiveYear("2026");
                  setPhotoIndex(null);
                }}
              >
                2026
              </button>

              <button
                type="button"
                className={
                  activeYear === "2025"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setActiveYear("2025");
                  setPhotoIndex(null);
                }}
              >
                2025
              </button>
            </div>
          </div>

          {visibleMedia.length === 0 ? (
            <div className="gallery-page-empty">
              <strong>
                {activeYear}
              </strong>

              <span>
                {text.comingSoon}
              </span>
            </div>
          ) : mode === "photos" ? (
            <div className="gallery-page-photo-grid">
              {photos.map(
                (photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className="gallery-page-photo"
                    onClick={() =>
                      setPhotoIndex(index)
                    }
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
                      className="gallery-page-zoom"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                )
              )}
            </div>
          ) : (
            <div className="gallery-page-video-grid">
              {visibleMedia.map((item) =>
                item.type === "video" ? (
                  <article
                    key={item.src}
                    className="gallery-page-video"
                  >
                    <video
                      src={item.src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </article>
                ) : null
              )}
            </div>
          )}
        </section>
      </div>

      {currentPhoto && (
        <div
          className="gallery-page-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            className="gallery-page-lightbox-close"
            onClick={closeLightbox}
            aria-label={text.close}
          >
            ×
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              className="
                gallery-page-lightbox-arrow
                gallery-page-lightbox-left
              "
              onClick={previousPhoto}
              aria-label={
                text.previous
              }
            >
              ←
            </button>
          )}

          <div className="gallery-page-lightbox-image">
            <Image
              src={
                currentPhoto.src
              }
              alt={
                currentPhoto.alt
              }
              fill
              sizes="100vw"
              priority
            />
          </div>

          {photos.length > 1 && (
            <button
              type="button"
              className="
                gallery-page-lightbox-arrow
                gallery-page-lightbox-right
              "
              onClick={nextPhoto}
              aria-label={text.next}
            >
              →
            </button>
          )}

          <div className="gallery-page-lightbox-count">
            {(photoIndex ?? 0) + 1}
            {" / "}
            {photos.length}
          </div>
        </div>
      )}
    </main>
  );
}