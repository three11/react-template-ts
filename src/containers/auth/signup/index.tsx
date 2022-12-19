import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Routes } from '@utilities';
import { AuthActionType } from '@store/enums';
import { Wrapper, SignupForm } from '@components';

export const Signup: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<Wrapper className="o-wrapper--fancy">
			<SignupForm
				onSubmit={(payload: any): void => {
					dispatch({
						type: AuthActionType.SIGNUP_REQUEST,
						payload: {
							...payload,
							redirect: (): void => navigate(Routes.LOGIN)
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
