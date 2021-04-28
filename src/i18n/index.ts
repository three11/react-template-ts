import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as en from '../assets/locale/translations.json';
import * as de from '../assets/locale/de.json';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as locales from './locales';

const resources = {
	en: {
		translation: en
	},
	de: {
		translation: de
	}
};

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		lng: localStorage.getItem('locale') || 'en',
		backend: {
			loadPath: '../assets/locale'
		},
		preload: locales,
		resources,
		keySeparator: false,
		interpolation: {
			escapeValue: false
		},
		detection: {
			order: ['navigator', 'localStorage', 'htmlTag'],
			caches: ['localStorage'],
			htmlTag: document.documentElement,
			lookupLocalStorage: 'locale'
		}
	});

export { i18n, locales };
export default i18n;
