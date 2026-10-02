"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

const languages: { code: Language; short: string }[] = [
  { code: "en", short: "EN" },
  { code: "ro", short: "RO" },
  { code: "de", short: "DE" },
  { code: "es", short: "ES" },
];

const galleryMenuCopy = {
  en: {
    photos: "PHOTOS",
    videos: "VIDEOS",
  },

  ro: {
    photos: "FOTOGRAFII",
    videos: "VIDEO",
  },

  de: {
    photos: "FOTOS",
    videos: "VIDEOS",
  },

  es: {
    photos: "FOTOS",
    videos: "VÍDEOS",
  },
} as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const galleryCopy = galleryMenuCopy[language];

  const closeMenu = () => {
    setMenuOpen(false);
    setGalleryOpen(false);
  };

  return (
    <nav>
      <div className="container nav-inner">
        {/* =================================================
            LOGO
        ================================================= */}

        <div className="logo-wrap">
          <Link
            href="/#home"
            onClick={closeMenu}
          >
            <Image
              src="/logo.jpg"
              alt="Adventure Enduro Tours Romania logo"
              width={900}
              height={900}
              priority
            />
          </Link>
        </div>

        {/* =================================================
            MAIN NAVIGATION
        ================================================= */}

        <div
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >
          {/* HOME */}

          <Link
            href="/#home"
            onClick={closeMenu}
          >
            {t("nav.home")}
          </Link>

          {/* TOURS */}

          <Link
            href="/#packages"
            onClick={closeMenu}
          >
            {t("nav.tours")}
          </Link>

          {/* ABOUT */}

          <Link
            href="/#about"
            onClick={closeMenu}
          >
            {t("nav.about")}
          </Link>

          {/* =================================================
              GALLERY + SUBMENU
          ================================================= */}

          <div
            className={`nav-gallery-menu ${
              galleryOpen ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="nav-gallery-main"
              onClick={() =>
                setGalleryOpen(
                  (current) => !current
                )
              }
              aria-expanded={galleryOpen}
              aria-haspopup="menu"
            >
              {t("nav.gallery")}

              <span
                className="nav-gallery-arrow"
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            <div
              className="nav-gallery-dropdown"
              role="menu"
            >
              <Link
                href="/gallery/photos"
                onClick={closeMenu}
                role="menuitem"
              >
                {galleryCopy.photos}
              </Link>

              <Link
                href="/gallery/videos"
                onClick={closeMenu}
                role="menuitem"
              >
                {galleryCopy.videos}
              </Link>
            </div>
          </div>

          {/* REVIEWS */}

          <Link
            href="/#reviews"
            onClick={closeMenu}
          >
            {t("nav.reviews")}
          </Link>

          {/* CONTACT */}

          <Link
            href="/#contact"
            onClick={closeMenu}
          >
            {t("nav.contact")}
          </Link>

          {/* =================================================
              MOBILE LANGUAGE SWITCHER
          ================================================= */}

          <div
            className="mobile-language-switcher"
            aria-label={t("language.label")}
          >
            {languages.map(
              ({ code, short }) => (
                <button
                  key={code}
                  type="button"
                  className={
                    language === code
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setLanguage(code)
                  }
                  aria-pressed={
                    language === code
                  }
                >
                  {short}
                </button>
              )
            )}
          </div>
        </div>

        {/* =================================================
            NAVBAR ACTIONS
        ================================================= */}

        <div className="nav-actions">
          {/* LANGUAGE SWITCHER */}

          <div
            className="language-switcher"
            aria-label={t("language.label")}
          >
            {languages.map(
              ({ code, short }) => (
                <button
                  key={code}
                  type="button"
                  className={
                    language === code
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setLanguage(code)
                  }
                  aria-label={t(
                    `language.${code}`
                  )}
                  aria-pressed={
                    language === code
                  }
                >
                  {short}
                </button>
              )
            )}
          </div>

          {/* BOOK NOW */}

          <Link
            className="book-top"
            href="/#booking"
            onClick={closeMenu}
          >
            {t("nav.book")}&nbsp; ›
          </Link>

          {/* MOBILE MENU BUTTON */}

          <button
            className="hamburger"
            type="button"
            onClick={() =>
              setMenuOpen(
                (current) => !current
              )
            }
            aria-label={t("nav.menu")}
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}