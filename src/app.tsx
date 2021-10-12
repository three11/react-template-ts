import * as React from 'react';
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';

import * as Loadables from './loadables';
import { Routes, isLoggedIn } from '@utilities';

import './assets/styles/app.scss';

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

export const GuestRoute = ({ component: Component, ...rest }: Props): JSX.Element => (
	<Route
		{...rest}
		render={(props: any): React.ReactNode =>
			!isLoggedIn() ? <Component {...props} {...rest} /> : <Redirect to={Routes.BASE} />
		}
	/>
);

export const App = () => (
	<Switch>
		<Route path={Routes.BASE} exact={true} component={Loadables.Home} />
		<GuestRoute path={Routes.LOGIN} exact={true} component={Loadables.Login} />
		<GuestRoute path={Routes.SIGNUP} exact={true} component={Loadables.Signup} />
		<GuestRoute path={Routes.PASSWORD_RESET} exact={true} component={Loadables.PasswordReset} />
		<Route component={Loadables.NotFound} />
	</Switch>
);
