import * as React from 'react';
import { Store } from 'redux';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'app.scss';

import * as Loadables from './loadables';
import { configureStore, RootStore, history } from './store';

export const store: Store<RootStore> = configureStore();

export const App = (): JSX.Element => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route path="/" component={Loadables.LoadableHomeComponent} />
				<Route component={Loadables.LoadableNotFoundComponent} />
			</Switch>
		</ConnectedRouter>
	</Provider>
);
