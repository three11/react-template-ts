import { readFileSync, writeFileSync } from 'fs';
import { i18nextToPot, gettextToI18next } from 'i18next-conv';

import locales from './locales.mjs';

const basePath = './src/assets/locale/';

const save = target => result => writeFileSync(target, result);

const jsonToPot = () => {
	i18nextToPot('en', readFileSync(basePath + 'translations.json'), undefined).then(
		save(basePath + 'translations.pot')
	);
};

const poToJson = () => {
	for (const locale of locales) {
		const path = basePath + locale;

		gettextToI18next(locale, readFileSync(path + '.po'), undefined).then(save(path + '.json'));
	}
};

if (process.argv.length > 0) {
	switch (process.argv[2]) {
		case 'jsonToPot':
			jsonToPot();
			break;
		case 'poToJson':
			poToJson();
			break;
		default:
			console.error(process.argv[2] + ' did not match');
	}
}
