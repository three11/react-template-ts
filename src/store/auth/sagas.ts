import { AnyAction } from 'redux';
import { put, call, takeLatest, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';

import { i18n } from '@i18n';
import { AuthAction } from './interfaces';
import { AuthActionType } from './enums';
import { login, logout, setItems, saveLocale, removeItems, passwordReset, setDocumentLang } from '@utilities';

type AuthSafaEffect = Generator<CallEffect<any> | PutEffect<AuthAction>>;
type AuthSagaForkEffect = Generator<ForkEffect<void>>;

export function* loginEffect(action: AnyAction): AuthSafaEffect {
	try {
		const { email, password, redirect } = action.payload;
		const data: any = yield call(login, { email, password });

		const payload = {
			token: data.access_token,
			threshold: data.threshold || 3600,
			refreshToken: data.refresh_token
		};

		yield put({ type: AuthActionType.LOGIN_SUCCESS, payload });
		yield call(setItems, payload);

		redirect();
	} catch (loginError) {
		yield put({
			type: AuthActionType.LOGIN_FAILED,
			payload: {
				loginError
			}
		});

		yield call(removeItems);
	}
}

export function* loginSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.LOGIN_REQUEST, loginEffect);
}

export function* logoutEffect(action: AnyAction): AuthSafaEffect {
	try {
		yield call(logout);

		const payload = {
			token: '',
			threshold: 0,
			refreshToken: ''
		};

		yield put({ type: AuthActionType.LOGOUT_SUCCESS, payload });
		yield call(removeItems);

		action.payload.redirect();
	} catch (logoutError) {
		yield put({
			type: AuthActionType.LOGOUT_FAILED,
			payload: {
				logoutError
			}
		});
	}
}

export function* logoutSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.LOGOUT_REQUEST, logoutEffect);
}

export function* passwordResetEffect(action: AnyAction): AuthSafaEffect {
	try {
		const { email, password, redirect } = action.payload;

		yield call(passwordReset, { email, password });
		yield put({ type: AuthActionType.PASSWORD_RESET_SUCCESS });

		redirect();
	} catch (passwordResetError) {
		yield put({
			type: AuthActionType.PASSWORD_RESET_FAILED,
			payload: {
				passwordResetError
			}
		});

		yield call(removeItems);
	}
}

export function* passwordResetSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.LOGIN_REQUEST, loginEffect);
}

export function* signupEffect(action: AnyAction): AuthSafaEffect {
	try {
		const { redirect, ...signupData } = action.payload;
		const data: any = yield call(login, signupData);

		const payload = {
			token: data.access_token,
			threshold: data.threshold || 3600,
			refreshToken: data.refresh_token
		};

		yield put({ type: AuthActionType.SIGNUP_SUCCESS, payload });
		yield call(setItems, payload);

		redirect();
	} catch (signupError) {
		yield put({
			type: AuthActionType.SIGNUP_FAILED,
			payload: {
				signupError
			}
		});

		yield call(removeItems);
	}
}

export function* signupSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.SIGNUP_REQUEST, signupEffect);
}

export function* localeEffect(action: AuthAction): AuthSafaEffect {
	try {
		const locale = action.payload?.locale;

		if (!locale) {
			yield put({
				type: AuthActionType.SET_LOCALE_FAILED
			});

			return;
		}

		i18n.changeLanguage(locale);
		saveLocale(locale);
		setDocumentLang(locale);

		yield put({
			type: AuthActionType.SET_LOCALE_SUCCESS,
			payload: { locale }
		});
	} catch (error) {
		yield put({
			type: AuthActionType.SET_LOCALE_FAILED
		});
	}
}

export function* localeSaga(): AuthSagaForkEffect {
	yield takeLatest(AuthActionType.SET_LOCALE_REQUEST, localeEffect);
}
