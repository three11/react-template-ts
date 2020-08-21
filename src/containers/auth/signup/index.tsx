import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Routes } from '@utilities/enums';
import { history } from '@src/store';
import { Wrapper } from '@components/wrapper';
import { SignupForm } from '@components/signup-form';
import { removeItems } from '@utilities/local-storage';
import { AuthActionType } from '@containers/auth/enums';

export const Signup: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	removeItems();
	dispatch({ type: AuthActionType.RESET_AUTH });

	return (
		<Wrapper className="o-wrapper--fancy">
			<SignupForm
				onSubmit={(payload: any): void => {
					dispatch({
						type: AuthActionType.SIGNUP_REQUEST,
						payload: {
							...payload,
							redirect: (): void => history.push(Routes.LOGIN)
						}
					});
				}}
			>
				<p className="c-form__hint">
					Already have an account? <Link to={Routes.LOGIN}>Login</Link>
				</p>
			</SignupForm>
		</Wrapper>
	);
};

export default Signup;
