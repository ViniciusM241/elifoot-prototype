import Card from "@/components/card";
import CountryCircle from "@/components/countryCircle";
import api from "@/helpers/api";

export default async function Rankings({ className, t }) {
  let data = [];
  try {
    const res = await api.get("/rankings");
    data = res.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <section id="rankings" className={className}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-color-secondary mb-xxxs">
              {t("rankings.title")}
            </h2>
            <p className="mb-xxs">{t("rankings.description")}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card
              title={t("rankings.card.world.title")}
              linkLabel={t("rankings.card.world.link")}
              link="/"
            >
              <ul className="ranking__list">
                {data.map((rank, index) => (
                  <li key={index} className="row mt-xxxs">
                    <p className="text-color-white col-2 col-md-1">
                      #{rank.rankingNumber}
                    </p>
                    <p className="text-color-white col-4 col-md-5">
                      {rank.name}
                    </p>
                    <p className="text-color-white col-4 col-md-5">
                      {rank.pts}pts
                    </p>
                    <div className="text-color-white col-2 col-md-1 d-flex justify-content-end">
                      <CountryCircle countryCode={rank.country} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
