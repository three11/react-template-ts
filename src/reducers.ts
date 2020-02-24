import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { Reducer, combineReducers } from 'redux';

import { authReducer } from '@containers/auth';

export default (history: History<any>): Reducer =>
	combineReducers({
		auth: authReducer,
		router: connectRouter(history)
	});
