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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="container nav-inner">
        {/* LOGO */}
        <div className="logo-wrap">
          <Link href="/#home" onClick={closeMenu}>
            <Image
              src="/logo.jpg"
              alt="Adventure Enduro Tours Romania logo"
              width={900}
              height={900}
              priority
            />
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/#home" onClick={closeMenu}>
            {t("nav.home")}
          </Link>

          <Link href="/#packages" onClick={closeMenu}>
            {t("nav.tours")}
          </Link>

          <Link href="/#about" onClick={closeMenu}>
            {t("nav.about")}
          </Link>

          <Link href="/#gallery" onClick={closeMenu}>
            {t("nav.gallery")}
          </Link>

          <Link href="/#reviews" onClick={closeMenu}>
            {t("nav.reviews")}
          </Link>

          <Link href="/#contact" onClick={closeMenu}>
            {t("nav.contact")}
          </Link>

          {/* MOBILE LANGUAGE SWITCHER */}
          <div
            className="mobile-language-switcher"
            aria-label={t("language.label")}
          >
            {languages.map(({ code, short }) => (
              <button
                key={code}
                type="button"
                className={language === code ? "active" : ""}
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
              >
                {short}
              </button>
            ))}
          </div>
        </div>

        {/* NAVBAR ACTIONS */}
        <div className="nav-actions">
          <div
            className="language-switcher"
            aria-label={t("language.label")}
          >
            {languages.map(({ code, short }) => (
              <button
                key={code}
                type="button"
                className={language === code ? "active" : ""}
                onClick={() => setLanguage(code)}
                aria-label={t(`language.${code}`)}
                aria-pressed={language === code}
              >
                {short}
              </button>
            ))}
          </div>

          <Link
            className="book-top"
            href="/#booking"
            onClick={closeMenu}
          >
            {t("nav.book")}&nbsp; ›
          </Link>

          <button
            className="hamburger"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
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