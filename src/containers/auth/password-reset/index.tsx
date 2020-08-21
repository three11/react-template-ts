import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Routes } from '@utilities/enums';
import { history } from '@src/store';
import { Wrapper } from '@components/wrapper';
import { removeItems } from '@utilities/local-storage';
import { AuthActionType } from '@containers/auth/enums';
import { PasswordResetForm } from '@components/password-reset-form';

export const PasswordReset: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	removeItems();
	dispatch({ type: AuthActionType.RESET_AUTH });

	return (
		<Wrapper className="o-wrapper--fancy">
			<PasswordResetForm
				onSubmit={(payload: any): void => {
					dispatch({
						type: AuthActionType.PASSWORD_RESET_REQUEST,
						payload: {
							...payload,
							redirect: (): void => history.push(Routes.LOGIN)
						}
					});
				}}
			>
				<p className="c-form__hint">
					You can also <Link to={Routes.SIGNUP}>Sign up</Link> or <Link to={Routes.LOGIN}>Login</Link>
				</p>
			</PasswordResetForm>
		</Wrapper>
	);
};

export default PasswordReset;
