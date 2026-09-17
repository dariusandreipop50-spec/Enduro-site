"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container footer-row">
        <div>
          {t("footer.copyright")}
        </div>

        <div className="footer-socials">
          <a
            href="https://www.instagram.com/adventureendurotoursromania?stkn=MXMwYzd4eTE4ZWdxeQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <span className="footer-divider">·</span>

          <a
            href="https://www.facebook.com/share/1J3ow22P27/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}