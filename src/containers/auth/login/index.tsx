import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Routes } from '@utilities/enums';
import { history } from '@src/store';
import { Wrapper } from '@components/wrapper';
import { LoginForm } from '@components/login-form';
import { removeItems } from '@utilities/local-storage';
import { AuthActionType } from '@containers/auth/enums';

export const Login: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	removeItems();
	dispatch({ type: AuthActionType.RESET_AUTH });

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
					Don&apos;t have an account? <Link to={Routes.SIGNUP}>Sign up</Link>
				</p>

				<p className="c-form__hint">
					Forgot password? <Link to={Routes.PASSWORD_RESET}>Reset password</Link>
				</p>
			</LoginForm>
		</Wrapper>
	);
};

export default Login;
