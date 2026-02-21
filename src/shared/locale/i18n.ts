import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

// oxlint-disable-next-line no-named-as-default-member
i18next
   .use(
      resourcesToBackend(
         (language: string, namespace: string) =>
            import(`./locales/${language}/${namespace}.json`)
      )
   )
   .use(initReactI18next)
   .init({
      lng: localStorage.getItem("LANGUAGE") || "ru",
      fallbackLng: "ru",
      supportedLngs: ["ru", "kg"],
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
         escapeValue: false,
      },
   });

export default i18next;
