import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Routes } from '@utilities';
import { history } from '@store/index';
import { AuthActionType } from '@store/enums';
import { Wrapper, LoginForm } from '@components';

export const Login: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return (
		<Wrapper className="o-wrapper--fancy">
			<LoginForm
				onSubmit={(payload: any): void => {
					dispatch({
						type: AuthActionType.LOGIN_REQUEST,
						payload: {
							...payload,
							redirect: (): void => history.push(Routes.BASE)
						}
					});
				}}
			>
				<p className="c-form__hint">
					{t("Don't have an account?")} <Link to={Routes.SIGNUP}>{t('Sign up')}</Link>
				</p>

				<p className="c-form__hint">
					{t('Forgot password?')} <Link to={Routes.PASSWORD_RESET}>{t('Reset password')}</Link>
				</p>
			</LoginForm>
		</Wrapper>
	);
};

export default Login;
