module.exports = {
	env: {
		browser: true,
		node: true,
		'jest/globals': true
	},
	extends: ['prettier', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname
	},
	plugins: ['jest', '@typescript-eslint'],
	ignorePatterns: ['bin/*', '*.js', '*.mjs'],
	rules: {
		'react/display-name': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
