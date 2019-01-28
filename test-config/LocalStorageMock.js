/**
 * LocalStorage Mock class used in tests by Jest
 * https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
 */
class LocalStorageMock {
	constructor() {
		this.store = {
			// Add your items here
		};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value.toString();
	}

	removeItem(key) {
		delete this.store[key];
	}
}

global.localStorage = new LocalStorageMock();
