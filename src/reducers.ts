import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { Reducer, combineReducers } from 'redux';

import counter from '@containers/home/reducer';

export default (history: History<any>): Reducer =>
	combineReducers({
		router: connectRouter(history),
		counter
	});
