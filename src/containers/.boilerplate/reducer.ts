import { ExampleActionType } from './enums';
import { ExampleState, ExampleAction } from './interfaces';

export const initialState: ExampleState = {
	error: false,
	loading: true
};

export default (state = initialState, { type, payload }: ExampleAction): ExampleState => {
	switch (type) {
		case ExampleActionType.REQUEST:
			return {
				...state,
				error: false,
				loading: true
			};
		case ExampleActionType.FAILED:
			return {
				...state,
				error: true,
				loading: false
			};
		case ExampleActionType.SUCCESS:
			return {
				...state,
				error: false,
				loading: false
			};

		default:
			return state;
	}
};
