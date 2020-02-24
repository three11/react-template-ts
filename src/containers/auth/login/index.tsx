import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { history } from '@src/store';
import { AuthActionType } from '@containers/auth';
import { Wrapper, LoginForm } from '@components';
import { Routes, removeItems } from '@utilities';

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
