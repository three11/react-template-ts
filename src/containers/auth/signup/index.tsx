import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Routes } from '@utilities';
import { history } from '@store/index';
import { AuthActionType } from '@store/auth';
import { Wrapper, SignupForm } from '@components';

export const Signup: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

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
					{t('Already have an account?')} <Link to={Routes.LOGIN}>{t('Login')}</Link>
				</p>
			</SignupForm>
		</Wrapper>
	);
};

export default Signup;
