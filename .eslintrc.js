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
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'jest'],
	ignorePatterns: ['webpack.config.js', 'test-config/*', 'bin/*', '.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'react/display-name': 'off'
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
