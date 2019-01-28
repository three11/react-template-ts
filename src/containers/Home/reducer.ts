import { INCREMENT, DECREMENT } from './constants';

export interface CounterState {
	count: number;
}

export interface CounterAction {
	type: string;
	payload: number;
}

export const homeInitialState: CounterState = {
	count: 0
};

export default (state = homeInitialState, { type, payload }: CounterAction) => {
	switch (type) {
		case INCREMENT:
		case DECREMENT:
			return {
				...state,
				count: state.count + payload
			};

		default:
			return state;
	}
};
