import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { removeItems } from '@utilities';
import { AuthActionType } from '@store/enums';
import { configureStore } from '@store/index';

export const store = configureStore();

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = createRoot(node);

const renderRoot = (Application: any): void => {
	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<Application />
			</BrowserRouter>
		</Provider>
	);
};

removeItems();

store.dispatch({ type: AuthActionType.RESET_AUTH });

renderRoot(App);
