import { getUnixTime } from 'date-fns';

import { Routes } from './enums';
import { removeItems } from './local-storage';
import { TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants';

export const getAccessToken = (): string => localStorage.getItem(TOKEN_KEY) || '';

export const isLoggedIn = (): boolean => {
	const threshold = Number(localStorage.getItem(TOKEN_THRESHOLD_KEY));

	if (!threshold) {
		return false;
	}

	const now = getUnixTime(new Date());

	if (now >= threshold) {
		removeItems();

		window.location.href = Routes.LOGIN;

		return false;
	}

	return !!getAccessToken() && window.location.pathname !== Routes.LOGIN;
};
