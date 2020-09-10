// @ts-nocheck
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({
	adapter: new Adapter()
});

global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;

jest.mock('react-inlinesvg');

jest.mock('react-i18next', () => ({
	Trans: ({ children }) => children,
	useTranslation: () => ({ t: key => key }),
	withTranslation: x => y => y
}));

jest.mock('i18next', () => ({
	__esModule: true,
	default: {
		use: () => ({
			init: () => jest.fn()
		}),
		changeLanguage: () => jest.fn()
	}
}));

jest.mock('@i18n', () => ({
	__esModule: true,
	default: {
		use: () => ({
			init: () => jest.fn()
		}),
		language: 'en',
		changeLanguage: () => jest.fn()
	},
	i18n: {
		use: () => ({
			init: () => jest.fn()
		}),
		language: 'en',
		changeLanguage: () => jest.fn()
	},
	locales: ['de']
}));
