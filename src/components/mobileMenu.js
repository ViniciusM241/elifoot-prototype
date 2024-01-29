"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import api from "@/helpers/api";
import { getToken } from "@/helpers/token";

export default function MobileMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState();

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    async function get() {
      const token = getToken();
      setUser(null);
      if (token) {
        const res = await api.get("/users/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res?.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      }
    }

    get();
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
              {user ? (
                <>
                  <li className="mb-xxxs">
                    <Link href={"/perfil"}>{t("common:nav.profile")}</Link>
                  </li>
                  <li>
                    <Link href={"/sair"}>{t("common:nav.logout")}</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href={"/login"}>{t("common:nav.signBtn")}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
