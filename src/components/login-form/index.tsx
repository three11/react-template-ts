import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Field, Button } from '@components';
import { useAppSelector } from '@src/utilities/hooks';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utilities';

interface Props {
	readonly onSubmit: (values: any) => void;
	readonly children?: React.ReactNode | React.ReactNode[];
}

// codebeat:disable[LOC]
export const LoginForm: React.FunctionComponent<Props> = (props: Props) => {
	const { t } = useTranslation();
	const required = t('This field is required.');
	const { loading, loginError } = useAppSelector(state => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onBlur'
	});

	return (
		<form className="c-form c-form--login" onSubmit={handleSubmit(props.onSubmit)}>
			<h2>Login</h2>

			<Field
				register={register('email', {
					required,
					pattern: {
						value: EMAIL_REGEX,
						message: t('Invalid email address.')
					}
				})}
				type="email"
				name="email"
				label={t('Email Address')}
				error={errors.email}
				placeholder="someone@example.com"
			/>

			<Field
				register={register('password', {
					required,
					pattern: {
						value: PASSWORD_REGEX,
						message: t('The password should contain least 8 characters.')
					}
				})}
				type="password"
				name="password"
				label={t('Password')}
				error={errors.password}
				placeholder="********"
			/>

			{!!loginError && <p className="c-form__error c-form__error--api">{loginError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				{t('Login')}
			</Button>

			{props.children}
		</form>
	);
};
// codebeat:enable[LOC]

export default LoginForm;
