import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { RootStore } from '@src/store';
import { Field, Button } from '@components';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utilities';

interface Props {
	readonly onSubmit: (values: any) => void;
	readonly children?: React.ReactNode | React.ReactNode[];
}

export const LoginForm: React.FunctionComponent<Props> = (props: Props) => {
	const { loading, loginError } = useSelector((store: RootStore) => store.auth);

	const { handleSubmit, register, errors } = useForm({
		mode: 'onBlur'
	});

	return (
		<form className="c-form c-form--login" onSubmit={handleSubmit(props.onSubmit)}>
			<h2>Login</h2>

			<Field
				register={register({
					required: 'This field is required.',
					pattern: {
						value: EMAIL_REGEX,
						message: 'Invalid email address.'
					}
				})}
				type="email"
				name="email"
				label="Email Address"
				error={errors.email}
				placeholder="someone@example.com"
			/>

			<Field
				register={register({
					required: 'This field is required.',
					pattern: {
						value: PASSWORD_REGEX,
						message: 'The password should contain least 8 characters.'
					}
				})}
				type="password"
				name="password"
				label="Password"
				error={errors.password}
				placeholder="********"
			/>

			{!!loginError && <p className="c-form__error c-form__error--api">{loginError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				Login
			</Button>

			{props.children}
		</form>
	);
};

export default LoginForm;
