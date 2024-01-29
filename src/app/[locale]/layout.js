import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Head from "next/head";
import { Suspense } from "react";

import initTranslations from "../i18n";

import Dependencies from "@/components/dependencies";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "Elifoot - Protótipo",
  description: "Prototipagem de reformulação de layout do jogo Elifoot",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children, params }) {
  const namespaces = ["common"];
  const { t } = await initTranslations(params.locale, namespaces);

  return (
    <html lang={params.locale}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Header params={params} t={t} className="mb-md" />
        {children}
        <Footer t={t} className="mt-lg" />
        <Suspense>
          <Dependencies />
        </Suspense>
      </body>
    </html>
  );
}
