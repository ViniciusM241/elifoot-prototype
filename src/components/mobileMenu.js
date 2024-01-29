"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MobileMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div
        aria-label="Abrir menu de navegação"
        className="header__mobile-menu"
        onClick={toggleActive}
      >
        <div className="header__mobile-menu__tick"></div>
        <div className="header__mobile-menu__tick"></div>
        <div className="header__mobile-menu__tick"></div>
      </div>
      {isActive && (
        <div className="header__mobile-container">
          <div className="container">
            <div className="d-flex justify-content-end">
              <div
                aria-label="Abrir menu de navegação"
                className="header__mobile-menu"
                onClick={toggleActive}
              >
                <p className="text-2 text-center text-bold text-color-secondary">
                  X
                </p>
              </div>
            </div>
            <ul className="header__mobile-nav mt-xxs">
              <li className="mb-xxxs">
                <Link href={"/"}>{t("common:nav.home")}</Link>
              </li>
              <li className="mb-xxxs">
                <Link
                  target="_blank"
                  href={
                    "https://www.elifoot.com/site/pt/index.asp?menu=0&main=0&locCountryCode="
                  }
                >
                  {t("common:nav.history")}
                </Link>
              </li>
              <li className="mb-xxxs">
                <Link
                  target="_blank"
                  href={
                    "https://www.elifoot.com/site/pt/index.asp?menu=0&main=0&locCountryCode="
                  }
                >
                  {t("common:nav.contact")}
                </Link>
              </li>
              <li>
                <Link href={"/login"}>{t("common:nav.signBtn")}</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
