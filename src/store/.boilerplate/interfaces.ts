import { ExampleActionType } from './enums';

export interface ExampleState {
	error: boolean;
	loading: boolean;
}

export interface ExampleAction {
	type: ExampleActionType;
	payload: Partial<ExampleState>;
}
