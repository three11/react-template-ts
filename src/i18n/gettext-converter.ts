/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs');
const { i18nextToPot, gettextToI18next } = require('i18next-conv');

const locales = require('./locales');
const basePath = './src/assets/locale/';

// @ts-ignore
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
