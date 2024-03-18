import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Add the getCookie function
function getCookie(name) {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + value + expires + '; path=/';
}

// Get the language from the cookie or the browser's language
const initialLanguage = getCookie('i18nextLng') || navigator.language.split('-')[0];

// Check if the initial language is one of the accepted languages, otherwise use 'en' as default
const acceptedLanguages = ['en', 'es'];
const languageToUse = acceptedLanguages.includes(initialLanguage) ? initialLanguage : 'en';

// Set the cookie with the language to use
setCookie('i18nextLng', languageToUse, 30);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      //translation file path
      // loadPath: '/i18n/{{ns}}/{{lng}}.json',
      loadPath: process.env.PUBLIC_URL + '/i18n/{{ns}}/{{lng}}.json',
    },
    // Use the language to use
    lng: languageToUse,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
