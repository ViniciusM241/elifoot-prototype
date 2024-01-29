import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import logo from "../../public/logo.svg";
import LanguageChanger from "./languageChanger";
import MobileMenu from "./mobileMenu";
import Profile from "./profile";
import TranslationsProvider from "./translationsProvider";

import initTranslations from "@/app/i18n";

export default async function Header({ className, params }) {
  const namespaces = ["common"];
  const { t, resources } = await initTranslations(params.locale, namespaces);

  return (
    <TranslationsProvider
      locale={params.locale}
      resources={resources}
      namespaces={namespaces}
    >
      <div className="header__upper">
        <div className="container d-flex justify-content-end">
          <Suspense>
            <LanguageChanger />
          </Suspense>
        </div>
      </div>
      <header className={className}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="header__logo">
            <Link href={"/"} className="text-decoration-none col-12">
              <Image
                src={logo}
                width={45}
                height={48}
                alt="Logo Elifoot"
                className="mr-sm"
              />
              <p className="text-semi">ELIFOOT</p>
            </Link>
          </div>
          <Suspense>
            <MobileMenu />
          </Suspense>
          <nav className="header__nav">
            <ul>
              <li className="mr-xxxs active">
                <Link href={"/"}>{t("common:nav.home")}</Link>
              </li>
              <li className="mr-xxxs">
                <Link
                  target="_blank"
                  href={
                    "https://www.elifoot.com/site/pt/index.asp?menu=0&main=0&locCountryCode="
                  }
                >
                  {t("common:nav.history")}
                </Link>
              </li>
              <li className="mr-xxs">
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
                <Suspense>
                  <Profile />
                </Suspense>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </TranslationsProvider>
  );
}
