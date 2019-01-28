import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { Store, createStore, applyMiddleware } from 'redux';

import sagas from './sagas';
import rootReducer from './reducers';
import { CounterState } from '@containers/Home/reducer';

export interface RootStore {
	counter: CounterState;
}

export const history = createHistory();
export const sagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<RootStore> {
	const historyMiddleware = routerMiddleware(history);

	const store: Store<RootStore> = createStore(
		rootReducer(history),
		{},
		composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware))
	) as Store<RootStore>;

	if (process.env.NODE_ENV === 'development' && (module as any).hot) {
		(module as any).hot.accept('./reducers', async () => {
			const nextRootReducer = await import('./reducers').then((reducer: any) => reducer);

			console.log('reloading reducer');

			store.replaceReducer(nextRootReducer(history));
		});
	}

	sagas.forEach((saga: Saga) => {
		sagaMiddleware.run(saga);
	});

	return store;
}
