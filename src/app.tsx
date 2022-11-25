import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import * as Loadables from './loadables';
import { Routes as AppRoutes, isLoggedIn } from '@utilities';

import './assets/styles/app.scss';

export const App = () => (
	<Routes>
		<Route path={AppRoutes.BASE} element={<Loadables.Home />} />
		{!isLoggedIn() ? <Route path={AppRoutes.LOGIN} element={<Loadables.Login />} /> : null}
		{!isLoggedIn() ? <Route path={AppRoutes.SIGNUP} element={<Loadables.Signup />} /> : null}
		{!isLoggedIn() ? <Route path={AppRoutes.PASSWORD_RESET} element={<Loadables.PasswordReset />} /> : null}
		<Route path="*" element={<Loadables.NotFound />} />
	</Routes>
);
