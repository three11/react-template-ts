// @ts-nocheck
const Enzyme = require('enzyme');
// TODO: Start using the official adapter when it is finalized
// https://github.com/enzymejs/enzyme/issues/2429#issuecomment-679265564
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({
	adapter: new Adapter()
});

global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;

jest.mock('react-inlinesvg');

jest.mock('axios', () => ({
	__esModule: true,
	default: {
		create: jest.fn(() => ({
			get: jest.fn(() => Promise.resolve()),
			post: jest.fn(() => Promise.resolve()),
			patch: jest.fn(() => Promise.resolve()),
			interceptors: {
				request: {
					use: jest.fn()
				},
				response: {
					use: jest.fn()
				}
			}
		}))
	}
}));

jest.mock('react-i18next', () => ({
	Trans: ({ children }) => children,
	useTranslation: () => ({ t: key => key }),
	withTranslation: () => y => y
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

jest.mock('history', () => ({
	createBrowserHistory: jest.fn()
}));
