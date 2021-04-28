import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Routes } from '@utilities';
import { Icon, Button } from '@components';
import { history, RootStore } from '@store/index';
import { AuthState, AuthActionType } from '@store/auth';

import './index.scss';

export const Header: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const authState: AuthState = useSelector((store: RootStore) => store.auth);

	const Nav = (): JSX.Element => (
		<nav className="c-nav">
			<ul>
				<li>
					<NavLink to={Routes.ABOUT}>{t('About')}</NavLink>
				</li>

				{!authState.token && (
					<li>
						<NavLink to={Routes.LOGIN}>{t('Login')}</NavLink>
					</li>
				)}

				{!!authState.token && (
					<>
						<li>
							<NavLink to={Routes.SETTINGS}>{t('Settings')}</NavLink>
						</li>

						<li>
							<Button
								onClick={(): void => {
									dispatch({
										type: AuthActionType.LOGOUT_REQUEST,
										payload: {
											redirect: (): void => history.push(Routes.LOGIN)
										}
									});
								}}
								className="c-btn--outline"
							>
								{t('Logout')}
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);

	return (
		<header className="c-header">
			<div className="o-shell o-shell--flex">
				<Link to={Routes.BASE} className="c-logo">
					<Icon src="/assets/react.svg" />
				</Link>

				<Nav />
			</div>
		</header>
	);
};

export default Header;
