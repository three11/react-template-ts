// @ts-nocheck
const jestMock = (path, mock) => {
	jest.mock(path, () => ({
		...jest.requireActual(path),
		...mock
	}));
};

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

jestMock('react-redux', {
	useDispatch: () => jest.fn()
});

jestMock('react-router-dom', {
	useNavigate: () => jest.fn()
});
