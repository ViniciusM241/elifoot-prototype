import Link from "next/link";

import api from "@/helpers/api";

export default async function Versions({ className, t }) {
  let data = [];
  try {
    const res = await api.get("/versions");
    data = res.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <section id="versions" className={className}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-color-secondary mb-xxxs">
              {t("versions.title")}
            </h2>
            <p className="mb-xxs">{t("versions.description")}</p>
          </div>
        </div>
        <div className="row">
          {data.map((version, index) => (
            <div key={index} className="col-12 col-md-4 mb-xxxs">
              <div className="version__item">
                <div className="version__item__bg"></div>
                <div className="version__item__info">
                  <div>
                    <p className="text-semi text-1 mb-xsm">
                      {version.description}
                    </p>
                    <p className="text-2 text-color-grey">
                      {t("versions.card.code", { code: version.code })}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link href={version.url} className="text-color-grey">
                      {t("versions.card.get")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
