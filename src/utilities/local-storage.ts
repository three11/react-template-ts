import * as moment from 'moment';

import { TOKEN_KEY, TOKEN_THRESHOLD_KEY, REFRESH_TOKEN_KEY } from './constants';

export const setThreshold = (time: number): string =>
	moment()
		.add(time || 3600, 'seconds')
		.unix()
		.toString();

export const handleItem = (key: string, value?: string): void => {
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};

export const setItems = (data: any): void => {
	handleItem(TOKEN_KEY, data.token);
	handleItem(TOKEN_THRESHOLD_KEY, setThreshold(data.threshold));
	handleItem(REFRESH_TOKEN_KEY, data.refreshToken);
};

export const removeItems = (): void => {
	handleItem(TOKEN_KEY);
	handleItem(TOKEN_THRESHOLD_KEY);
	handleItem(REFRESH_TOKEN_KEY);
};
