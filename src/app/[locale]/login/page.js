import { Suspense } from "react";

import Form from "./_components/form";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translationsProvider";

export default async function Login({ params }) {
  const namespaces = ["login", "common"];
  const { t, resources } = await initTranslations(params.locale, namespaces);

  return (
    <TranslationsProvider
      locale={params.locale}
      resources={resources}
      namespaces={namespaces}
    >
      <main id="login">
        <div className="container">
          <div className="d-flex align-items-center flex-column">
            <h1 className="text-color-primary text-center mb-sm">
              {t("title")}
            </h1>
            <p className="text-1 text-center">{t("subtitle")}</p>
            <div className="mt-xxs col-12 col-md-4">
              <Suspense>
                <Form />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
