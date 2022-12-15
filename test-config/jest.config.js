module.exports = {
	verbose: false,
	rootDir: '..',
	moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
	moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@root/(.*)$': '<rootDir>/$1',
		'^@i18n': '<rootDir>/src/i18n',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@utilities': '<rootDir>/src/utilities',
		'^@utilities/(.*)$': '<rootDir>/src/utilities/$1',
		'^@components': '<rootDir>/src/components',
		'^@containers/(.*)$': '<rootDir>/src/containers/$1',
		'\\.(css|less|sass|scss)$': '<rootDir>/test-config/StyleMock.js',
		'\\.(jpg|jpeg|png|gif|ico|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test-config/FileMock.js'
	},
	setupFiles: ['jest-localstorage-mock', '<rootDir>/test-config/index.js'],
	transform: {
		'\\.svg$': '<rootDir>/test-config/FileMock.js',
		'\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/test-config/tsconfig.json'
			}
		]
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/test-config/']
};
