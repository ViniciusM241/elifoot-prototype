import "./styles.css";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/logo.svg";

export default function Footer({ className, t }) {
  return (
    <div className="footer_wrapper">
      <footer className={className}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="footer__logo">
                <Image
                  src={logo}
                  width={63}
                  height={68}
                  alt="Logo Elifoot"
                  className="mb-sm"
                />
                <p className="text-semi text-color-white">ELIFOOT</p>
              </div>
            </div>
            <div className="col-6 footer__nav">
              <ul className="mr-md">
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
                <li>
                  <Link
                    target="_blank"
                    href={
                      "https://www.elifoot.com/site/pt/index.asp?menu=0&main=0&locCountryCode="
                    }
                  >
                    {t("common:nav.contact")}
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="mb-xxxs">
                  <Link href={"/"}>{t("common:nav.privacyPolicy")}</Link>
                </li>
                <li>
                  <Link href={"/"}>{t("common:nav.licenseContract")}</Link>
                </li>
              </ul>
            </div>
            <div className="col-3">{/* SOCIAL MEDIA */}</div>
          </div>
        </div>
      </footer>
      <div className="footer__bottom">
        <p className="text-color-grey-3 text-3">
          {t("common:nav.copyright")} - ©1987-2024 André Elias
        </p>
      </div>
    </div>
  );
}
