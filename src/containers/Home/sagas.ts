import { put, takeEvery, delay } from 'redux-saga/effects';

import { increment, decrement } from './actions';
import { INCREMENT_ASYNC, DECREMENT_ASYNC } from './constants';

export function* incrementAsync() {
	yield delay(1000);
	yield put(increment());
}

export function* decrementAsync() {
	yield delay(1000);
	yield put(decrement());
}

export function* incrementSaga() {
	yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

export function* decrementSaga() {
	yield takeEvery(DECREMENT_ASYNC, decrementAsync);
}
