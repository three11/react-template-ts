import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { history } from '@src/store';
import { AuthActionType } from '@containers/auth';
import { removeItems, Routes } from '@utilities';
import { Wrapper, SignupForm } from '@components';

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
