import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router';

import { App } from './app';
import { removeItems } from '@utilities';
import { AuthActionType } from '@store/enums';
import { history, configureStore } from '@store/index';

export const store = configureStore();

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = createRoot(node);

const renderRoot = (Application: any): void => {
	root.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Application />
			</ConnectedRouter>
		</Provider>
	);
};

removeItems();

store.dispatch({ type: AuthActionType.RESET_AUTH });

renderRoot(App);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js');
	});
}
