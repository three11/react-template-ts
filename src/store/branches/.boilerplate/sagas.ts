import { put, call, takeLatest, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';

import { ExampleAction } from './interfaces';
import { ExampleActionType } from './enums';

type ExampleSafaEffect = Generator<CallEffect<any> | PutEffect<ExampleAction>>;
type ExampleSagaForEffect = Generator<ForkEffect<void>>;

export function* exampleEffect(): ExampleSafaEffect {
	try {
		const payload: any = yield call(() => true);

		yield put({ type: ExampleActionType.SUCCESS, payload });
	} catch (error) {
		yield put({
			type: ExampleActionType.FAILED,
			payload: {
				error
			}
		});
	}
}

export function* exampleSaga(): ExampleSagaForEffect {
	yield takeLatest(ExampleActionType.REQUEST, exampleEffect);
}
