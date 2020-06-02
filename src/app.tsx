import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';

import 'app.scss';

import * as Loadables from './loadables';
import { Routes, isLoggedIn } from './utilities';

interface Props {
	readonly component: React.ComponentType;
	readonly [x: string]: any;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props): JSX.Element => (
	<Route
		{...rest}
		render={(props: any): React.ReactNode =>
			isLoggedIn() ? <Component {...props} {...rest} /> : <Redirect to={Routes.LOGIN} />
		}
	/>
);

export const App = hot(() => (
	<Switch>
		<Route path={Routes.LOGIN} exact={true} component={Loadables.Login} />
		<Route path={Routes.SIGNUP} exact={true} component={Loadables.Signup} />
		<Route path={Routes.PASSWORD_RESET} exact={true} component={Loadables.PasswordReset} />
		<PrivateRoute path={Routes.BASE} exact={true} component={Loadables.Home} />
		<Route component={Loadables.NotFound} />
	</Switch>
));
