import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History, createBrowserHistory } from 'history';
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga';
import { Store, Middleware, createStore, applyMiddleware } from 'redux';

import sagas from './sagas';
import rootReducer from './reducers';

import { CounterState } from '@containers/home/reducer';

export interface RootStore {
	counter: CounterState;
}

export const history: History = createBrowserHistory();
export const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<RootStore> {
	const historyMiddleware: Middleware = routerMiddleware(history);

	const store: Store<RootStore> = createStore(
		rootReducer(history),
		{
			// Initial state should be here
		},
		composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware))
	);

	if (module.hot) {
		module.hot.accept();

		store.replaceReducer(require('./reducers').default(history));
	}

	sagas.forEach((saga: Saga) => {
		sagaMiddleware.run(saga);
	});

	return store;
}
