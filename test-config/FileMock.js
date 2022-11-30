const { basename } = require('path');

module.exports = {
	/**
	 * @param {any} _
	 * @param {string} filename
	 */
	process(_, filename) {
		return `module.exports = ${JSON.stringify(basename(filename))};`;
	}
};
