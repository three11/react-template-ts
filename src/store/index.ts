import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History, createBrowserHistory } from 'history';
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga';
import { Store, Middleware, createStore, applyMiddleware } from 'redux';

import sagas from './sagas';
import rootReducer from './reducers';
import { AuthState, initialState as authInitialState } from './auth';

export interface RootState {
	auth: AuthState;
}

export const history: History = createBrowserHistory();
export const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<RootState> {
	const historyMiddleware: Middleware = routerMiddleware(history);

	const store: Store<RootState> = createStore(
		rootReducer(history),
		{
			auth: authInitialState
		},
		composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware))
	);

	if (module.hot) {
		module.hot.accept();

		// eslint-disable-next-line
		store.replaceReducer(require('./reducers').default(history));
	}

	sagas.forEach((saga: Saga) => {
		sagaMiddleware.run(saga);
	});

	return store;
}
