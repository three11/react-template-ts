const constantDate = new Date('2017-12-31T23:59:59');

/**
 * Date constructor will now return
 * the same date each time it is called
 */
Date = class extends Date {
	constructor() {
		return constantDate;
	}
};

const time = new Date().getTime();

export default time;
