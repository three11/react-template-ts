import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { install, applyUpdate } from 'offline-plugin/runtime';

import { App } from './app';

import '@assets/favicon.ico';

declare global {
	interface Window {
		__REACT_DEVTOOLS_GLOBAL_HOOK__: any;
		__REDUX_DEVTOOLS_EXTENSION__: any;
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
	}
}

const node: HTMLElement | null = document.getElementById('app');
const renderRoot = (app: JSX.Element) => render(app, node);

if (process.env.NODE_ENV === 'production') {
	install({
		onUpdateReady: () => applyUpdate(),
		onUpdated: () => window.location.reload()
	});

	renderRoot(<App />);
} else {
	renderRoot(
		<AppContainer>
			<App />
		</AppContainer>
	);

	if ((module as any).hot) {
		(module as any).hot.accept('./app', async () => {
			const NextApp = await import('./app').then((comp: any) => comp.App);

			renderRoot(
				<AppContainer>
					<NextApp />
				</AppContainer>
			);
		});
	}
}
