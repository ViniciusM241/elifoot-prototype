import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import initTranslations from "@/app/i18n";
import Card from "@/components/card";
import CountryCircle from "@/components/countryCircle";
import api from "@/helpers/api";
import "./style.css";
import moment from "moment";

export default async function Perfil({ params }) {
  const namespaces = ["profile"];
  const { t } = await initTranslations(params.locale, namespaces);
  let data = {
    ranking: [],
    info: {},
    scoreByGame: [],
  };
  const cookieStore = cookies();
  const cookie = cookieStore.get("token");

  if (!cookie?.value || cookie?.value === "null") {
    redirect("/login");
  }

  try {
    const token = cookie.value;
    const res = await api.get("/users/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data = res.data;

    const rank = data.ranking.find((x) => x.coachId === data.info.id);

    data.info.rank = rank.rankingPosition;
    data.info.points = rank.points;
  } catch (err) {
    console.log(err);
  }

  return (
    <main id="perfil">
      <div className="container">
        <div className="row mb-xxxs">
          <div className="col-12">
            <h1>{t("title")}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-7 mb-xxs">
            <Card title={t("ranking.title")}>
              <div className="row">
                <div className="col-12 col-md-4 d-flex flex-column align-items-center points__wrapper mb-xxxs">
                  <h2 className="text-color-primary">
                    #{data.info.rank || "~"}
                  </h2>
                  <h3 className="text-color-primary">
                    {data.info.points || "~"}pts
                  </h3>
                </div>
                <div className="col-12 col-md-8">
                  <ul className="ranking__list">
                    {data.ranking.map((rank, index) => {
                      const isLoggedUser = data.info.id === rank.coachId;

                      return (
                        <li key={index} className="row mt-xxxs">
                          <p
                            className={`text-color-${isLoggedUser ? "primary" : "white"} col-3`}
                          >
                            #{rank.rankingPosition}
                          </p>
                          <p
                            className={`text-color-${isLoggedUser ? "primary" : "white"} col-4`}
                          >
                            {rank.coachName}
                          </p>
                          <p
                            className={`text-color-${isLoggedUser ? "primary" : "white"} col-3`}
                          >
                            {rank.points}pts
                          </p>
                          <div className={`d-flex justify-content-end col-2`}>
                            <CountryCircle countryCode={rank.country} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-5 mb-xxs">
            <Card
              title={t("info.title")}
              linkLabel={t("info.edit")}
              link={"/"}
              className={"h-100"}
            >
              <div>
                <p className="text-2 text-color-white mb-xxxs">
                  {t("info.info.name")} <span>{data.info.name}</span>
                </p>
                <p className="text-2 text-color-white mb-xxxs">
                  {t("info.info.email")} <span>{data.info.email}</span>
                </p>
                <p className="text-2 text-color-white mb-xxxs">
                  {t("info.info.team")} <span>{data.info.teamName}</span>
                </p>
                <p className="text-2 text-color-white">
                  {t("info.info.status")}{" "}
                  {data.info.status === "Active" ? (
                    <span className="bullet bullet--active">ativo</span>
                  ) : (
                    <span className="bullet bullet--active">ativo</span>
                  )}
                </p>
              </div>
            </Card>
          </div>
          <div className="col-12">
            <Card title={t("pointsByGame.title")}>
              <div className="col-12">
                <ul className="ranking__list">
                  {data.scoreByGame.map((game, index) => (
                    <li key={index} className="row mt-xxxs">
                      <p className="text-color-white col-3">
                        {moment(game.timestamp).format("DD/MM/yyyy HH:mm:ss")}
                      </p>
                      <p className="text-color-white col-6">{game.teamName}</p>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="text-color-white">+{game.points}pts</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
