import { add, getUnixTime } from 'date-fns';

import { AuthAction } from '@containers/auth';
import { TOKEN_KEY, TOKEN_THRESHOLD_KEY, REFRESH_TOKEN_KEY } from './constants';

export const setThreshold = (time: number): string =>
	getUnixTime(
		add(new Date(), {
			seconds: time || 3600
		})
	).toString();

export const handleItem = (key: string, value?: string): void => {
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const setItems = (data: AuthAction['payload']): void => {
	handleItem(TOKEN_KEY, data!.token);
	handleItem(TOKEN_THRESHOLD_KEY, setThreshold(data!.threshold!));
	handleItem(REFRESH_TOKEN_KEY, data!.refreshToken);
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export const removeItems = (): void => {
	handleItem(TOKEN_KEY);
	handleItem(TOKEN_THRESHOLD_KEY);
	handleItem(REFRESH_TOKEN_KEY);
};
