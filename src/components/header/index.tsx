import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Routes } from '@utilities';
import { Icon, Button } from '@components';
import { useAppSelector } from '@utilities/hooks';
import { AuthActionType } from '@store/enums';

import './index.scss';

export const Header: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authState = useAppSelector(state => state.auth);

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
											redirect: (): void => navigate(Routes.LOGIN)
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
					<Icon src="./public/react.svg" />
				</Link>

				<Nav />
			</div>
		</header>
	);
};

export default Header;
