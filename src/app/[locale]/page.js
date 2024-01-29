import initTranslations from "../i18n";
import Main from "./_components/main";
import Rankings from "./_components/rankings";
import Versions from "./_components/versions";

import TranslationsProvider from "@/components/translationsProvider";

export default async function Home({ params }) {
  const namespaces = ["home"];
  const { t, resources } = await initTranslations(params.locale, namespaces);

  return (
    <TranslationsProvider
      locale={params.locale}
      resources={resources}
      namespaces={namespaces}
    >
      <main id="home">
        <Main t={t} className="mb-lg" />
        <Versions t={t} className="mb-lg" />
        <Rankings t={t} />
      </main>
    </TranslationsProvider>
  );
}
