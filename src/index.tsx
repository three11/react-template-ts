import * as React from 'react';
import { Store } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { install, applyUpdate } from 'offline-plugin/runtime';

import { App } from './app';
import { removeItems } from '@utilities/local-storage';
import { AuthActionType } from '@containers/auth/enums';
import { RootStore, configureStore, history } from './store';

export const store: Store<RootStore> = configureStore();

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const renderRoot = (app: JSX.Element): void => render(app, node);
const router = (Application: any): JSX.Element => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Application />
		</ConnectedRouter>
	</Provider>
);

removeItems();

store.dispatch({ type: AuthActionType.RESET_AUTH });

renderRoot(router(App));

if (module.hot) {
	module.hot.accept();

	// eslint-disable-next-line
	renderRoot(router(require('./app').App));
}

if (process.env.NODE_ENV === 'production') {
	install({
		onUpdateReady: () => applyUpdate(),
		onUpdated: () => window.location.reload()
	});
}
