import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { App } from './app';
import { removeItems } from '@utilities';
import { AuthActionType } from '@store/enums';
import { history, configureStore } from '@store/index';

export const store = configureStore();

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

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js');
	});
}
