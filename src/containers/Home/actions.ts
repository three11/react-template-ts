import { CounterAction } from './reducer';
import { INCREMENT, DECREMENT } from './constants';

export const increment = (): CounterAction => ({
	type: INCREMENT,
	payload: 1
});

export const decrement = (): CounterAction => ({
	type: DECREMENT,
	payload: -1
});
