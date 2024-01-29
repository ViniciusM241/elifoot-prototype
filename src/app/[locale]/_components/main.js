import Link from "next/link";

import Button from "@/components/button";

import "./style.css";

export default function Main({ className, t }) {
  return (
    <section id="main" className={className}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5">
            <div className="main__bg-image"></div>
          </div>
          <div className="col-12 col-md-7 d-flex align-items-center mt-xxxs">
            <div className="main__text">
              <h1 className="text-color-white mb-xxs">{t("main.title")}</h1>
              <p className="mb-xs text-color-white text-1">
                {t("main.description")}
              </p>
              <p className="mb-xs text-color-white text-1">
                {t("main.description2")}
              </p>
              <Link href={"/login"}>
                <Button variant="primary">{t("main.signBtn")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
