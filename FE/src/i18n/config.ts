import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonEn from '../locales/en/common.json';
import authEn from '../locales/en/auth.json';
import sidebarEn from '../locales/en/sidebar.json';
import dashboardEn from '../locales/en/dashboard.json';
import standsEn from '../locales/en/stands.json';
import usersEn from '../locales/en/users.json';

import commonAr from '../locales/ar/common.json';
import authAr from '../locales/ar/auth.json';
import sidebarAr from '../locales/ar/sidebar.json';
import dashboardAr from '../locales/ar/dashboard.json';

// Define resources
const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    sidebar: sidebarEn,
    dashboard: dashboardEn,
    stands: standsEn,
    users: usersEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    sidebar: sidebarAr,
    dashboard: dashboardAr,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'sidebar', 'dashboard', 'stands', 'users'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
