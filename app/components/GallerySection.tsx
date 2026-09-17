"use client";

import Image from "next/image";
import { useState } from "react";
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
|
| 6 completely independent slides.
|
| Every photo/video belongs to ONE slide only.
| Nothing is shared or repeated between slides.
|
| These paths match the renamed Gallery ZIP.
|
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
    next: "Show next gallery item",
  },

  ro: {
    eyebrow: "DE PE TRASEE",
    line1: "TRĂIEȘTE. EXPLOREAZĂ.",
    line2: "AMINTEȘTE-ȚI.",
    description:
      "O privire asupra traseelor, munților, pădurilor și momentelor de neuitat din aventurile noastre enduro din România.",
    next: "Arată următorul element din galerie",
  },

  de: {
    eyebrow: "VON DEN TRAILS",
    line1: "FAHREN. ENTDECKEN.",
    line2: "ERINNERN.",
    description:
      "Ein Einblick in die Trails, Berge, Wälder und unvergesslichen Momente unserer Enduro-Abenteuer in Rumänien.",
    next: "Nächstes Galerieelement anzeigen",
  },

  es: {
    eyebrow: "DESDE LOS SENDEROS",
    line1: "CONDUCE. EXPLORA.",
    line2: "RECUERDA.",
    description:
      "Una mirada a los senderos, montañas, bosques y momentos inolvidables de nuestras aventuras de enduro en Rumanía.",
    next: "Mostrar el siguiente elemento de la galería",
  },
} as const;

/*
|--------------------------------------------------------------------------
| INDIVIDUAL GALLERY TILE
|--------------------------------------------------------------------------
*/

type GalleryTileProps = {
  media: GalleryMedia[];
  className: string;
  sizes: string;
  nextLabel: string;
};

function GalleryTile({
  media,
  className,
  sizes,
  nextLabel,
}: GalleryTileProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const currentMedia = media[currentIndex];

  const showNextMedia = () => {
    if (isChanging) return;

    setIsChanging(true);

    window.setTimeout(() => {
      setCurrentIndex((current) => {
        return (current + 1) % media.length;
      });

      setIsChanging(false);
    }, 180);
  };

  return (
    <button
      type="button"
      className={`gallery-mosaic-item gallery-clickable-item ${className} ${
        isChanging ? "is-changing" : ""
      }`}
      onClick={showNextMedia}
      aria-label={`${nextLabel}: ${currentMedia.alt}`}
    >
      <div className="gallery-media-wrapper">
        {currentMedia.type === "image" ? (
          <Image
            key={currentMedia.src}
            src={currentMedia.src}
            alt={currentMedia.alt}
            fill
            sizes={sizes}
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

        {/* 6 INDEPENDENT GALLERY SLIDES */}

        <div className="gallery-mosaic">
          {galleryGroups.map((group, index) => (
            <GalleryTile
              key={`gallery-slide-${index + 1}`}
              media={group.media}
              className={`gallery-item-${index + 1}`}
              sizes={
                index === 0
                  ? "(max-width: 600px) 100vw, (max-width: 900px) 100vw, 60vw"
                  : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 35vw"
              }
              nextLabel={copy.next}
            />
          ))}
        </div>
      </div>
    </section>
  );
}