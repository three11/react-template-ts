import {
	put,
	delay,
	takeEvery,
	SimpleEffect,
	PutEffectDescriptor,
	CallEffectDescriptor,
	ForkEffectDescriptor
} from 'redux-saga/effects';

import { CounterAction } from './reducer';
import { increment, decrement } from './actions';
import { INCREMENT_ASYNC, DECREMENT_ASYNC } from './constants';

export function* incrementAsync(): IterableIterator<
	SimpleEffect<'PUT', PutEffectDescriptor<CounterAction>> | SimpleEffect<'CALL', CallEffectDescriptor<CounterAction>>
> {
	yield delay(1000);
	yield put(increment());
}

export function* decrementAsync(): IterableIterator<
	SimpleEffect<'PUT', PutEffectDescriptor<CounterAction>> | SimpleEffect<'CALL', CallEffectDescriptor<CounterAction>>
> {
	yield delay(1000);
	yield put(decrement());
}

export function* incrementSaga(): IterableIterator<SimpleEffect<'FORK', ForkEffectDescriptor<CounterAction>>> {
	yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

export function* decrementSaga(): IterableIterator<SimpleEffect<'FORK', ForkEffectDescriptor<CounterAction>>> {
	yield takeEvery(DECREMENT_ASYNC, decrementAsync);
}
