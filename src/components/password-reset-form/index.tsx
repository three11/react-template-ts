import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Field } from '@components/field';
import { Button } from '@components/button';
import { RootStore } from '@src/store';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utilities/constants';

interface Props {
	readonly onSubmit: (values: any) => void;
	readonly children?: React.ReactNode | React.ReactNode[];
}

export const PasswordResetForm: React.FunctionComponent<Props> = (props: Props) => {
	const { loading, passwordResetError } = useSelector((store: RootStore) => store.auth);

	const { handleSubmit, register, errors, watch } = useForm({
		mode: 'onBlur'
	});

	return (
		<form className="c-form c-form--login" onSubmit={handleSubmit(props.onSubmit)}>
			<h2>Reset your account&quot;s password</h2>

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
				label="New password"
				error={errors.password}
				placeholder="********"
			/>

			<Field
				register={register({
					validate: (value: string) => value === watch('password') || 'The passwords do not match'
				})}
				type="password"
				name="confirm"
				label="Confirm new password"
				error={errors.confirm}
				placeholder="********"
			/>

			{!!passwordResetError && <p className="c-form__error c-form__error--api">{passwordResetError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				Reset password
			</Button>

			{props.children}
		</form>
	);
};

export default PasswordResetForm;
