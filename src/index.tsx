import * as React from 'react';
import { Store } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { install, applyUpdate } from 'offline-plugin/runtime';

import { App } from './app';
import { RootStore, configureStore, history } from './store';

export const store: Store<RootStore> = configureStore();

const node: HTMLElement | null = document.getElementById('app');
const renderRoot = (app: JSX.Element): void => render(app, node);
const router = (Application: any): JSX.Element => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Application />
		</ConnectedRouter>
	</Provider>
);

renderRoot(router(App));

if (module.hot) {
	module.hot.accept();

	renderRoot(router(require('./app').App));
}

if (process.env.NODE_ENV === 'production') {
	install({
		onUpdateReady: () => applyUpdate(),
		onUpdated: () => window.location.reload()
	});
}
