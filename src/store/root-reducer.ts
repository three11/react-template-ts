import { Reducer, combineReducers } from 'redux';

import auth from '@store/branches/auth/reducer';

export default (): Reducer =>
	combineReducers({
		auth
	});
