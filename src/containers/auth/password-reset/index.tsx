import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Routes } from '@utilities/enums';
import { history } from '@store';
import { Wrapper } from '@components/wrapper';
import { AuthActionType } from '@containers/auth/enums';
import { PasswordResetForm } from '@components/password-reset-form';

export const PasswordReset: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

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
					{t('You can also')} <Link to={Routes.SIGNUP}>{t('Sign up')}</Link> {t('or')}{' '}
					<Link to={Routes.LOGIN}>{t('Login')}</Link>
				</p>
			</PasswordResetForm>
		</Wrapper>
	);
};

export default PasswordReset;
