import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { install, applyUpdate } from 'offline-plugin/runtime';

import { App } from './app';

import '@assets/favicon.ico';

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

	if (module.hot) {
		module.hot.accept('./app', () => {
			const NextApp = require('./app').App;

			renderRoot(
				<AppContainer>
					<NextApp />
				</AppContainer>
			);
		});
	}
}
