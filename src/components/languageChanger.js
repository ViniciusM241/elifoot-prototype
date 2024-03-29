"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import i18nConfig from "@/i18nConfig";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  return (
    <>
      <div
        onClick={() => handleChange("pt-BR")}
        className={`header__upper__country mr-sm country-brazil`}
      ></div>
      <div
        onClick={() => handleChange("pt-BR")}
        className={`header__upper__country mr-sm country-portugal`}
      ></div>
      <div
        onClick={() => handleChange("en")}
        className={`header__upper__country mr-sm country-usa`}
      ></div>
      <div
        onClick={() => handleChange("es")}
        className={`header__upper__country country-spain`}
      ></div>
    </>
  );
}
