const { basename } = require('path');

module.exports = {
	// eslint-disable-next-line no-unused-vars
	process(src, filename, config, options) {
		return `module.exports = ${JSON.stringify(basename(filename))};`;
	}
};
