import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import 'app.scss';

import * as Loadables from './loadables';

export const App = hot(() => (
	<Switch>
		<Route path="/" component={Loadables.LoadableHomeComponent} />
		<Route component={Loadables.LoadableNotFoundComponent} />
	</Switch>
));
