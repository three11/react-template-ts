module.exports = {
	options: {
		debug: false,
		func: {
			list: ['i18next.t', 'i18n.t', 'this.props.t', 'props.t', 't'],
			extensions: ['.ts', '.tsx']
		},
		trans: {
			component: 'Trans',
			i18nKey: 'i18nKey',
			defaultsKey: 'defaults',
			extensions: ['.js', '.jsx'],
			fallbackKey: (_, value) => value
		},
		defaultValue: (lng, ns, key) => key,
		resource: {
			loadPath: 'src/assets/locale/translations.json',
			savePath: 'src/assets/locale/translations.json',
			jsonIndent: 2,
			lineEnding: '\n'
		},
		nsSeparator: false,
		keySeparator: false,
		interpolation: {
			prefix: '{{',
			suffix: '}}'
		},
		removeUnusedKeys: true
	}
};
