import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    ns: ['common', 'errors', 'auth'],
    defaultNS: 'common',
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: '.',
    interpolation: { escapeValue: false },
  });

export default i18n;
