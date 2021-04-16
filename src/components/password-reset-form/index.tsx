import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootStore } from '@store/index';
import { Field, Button } from '@components';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utilities';

interface Props {
	readonly onSubmit: (values: any) => void;
	readonly children?: React.ReactNode | React.ReactNode[];
}

// codebeat:disable[LOC]
export const PasswordResetForm: React.FunctionComponent<Props> = (props: Props) => {
	const { t } = useTranslation();
	const required = t('This field is required.');
	const { loading, passwordResetError } = useSelector((store: RootStore) => store.auth);
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onBlur'
	});

	return (
		<form className="c-form c-form--login" onSubmit={handleSubmit(props.onSubmit)}>
			<h2>Reset your account&apos;s password</h2>

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
				label={t('New password')}
				error={errors.password}
				placeholder="********"
			/>

			<Field
				register={register('confirm', {
					// prettier-ignore
					validate: (value: string) => value === watch('password') || (t('The passwords do not match') as string)
				})}
				type="password"
				name="confirm"
				label={t('Confirm new password')}
				error={errors.confirm}
				placeholder="********"
			/>

			{!!passwordResetError && <p className="c-form__error c-form__error--api">{passwordResetError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				{t('Reset password')}
			</Button>

			{props.children}
		</form>
	);
};
// codebeat:enable[LOC]

export default PasswordResetForm;
