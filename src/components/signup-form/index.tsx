import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Field } from '@components/field';
import { Button } from '@components/button';
import { RootStore } from '@store';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utilities/constants';

interface Props {
	readonly onSubmit: (values: any) => void;
	readonly children?: React.ReactNode | React.ReactNode[];
}

export const SignupForm: React.FunctionComponent<Props> = (props: Props) => {
	const { t } = useTranslation();
	const required = t('This field is required.');
	const { loading, signupError } = useSelector((store: RootStore) => store.auth);
	const { watch, errors, register, handleSubmit } = useForm({
		mode: 'onBlur'
	});

	return (
		<form className="c-form c-form--signup" onSubmit={handleSubmit(props.onSubmit)}>
			<h2>Signup</h2>

			<div className="c-form__cols">
				<div className="c-form__col">
					<Field
						register={register({
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
						register={register({
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

					<Field
						register={register({
							// prettier-ignore
							validate: (value: string) => value === watch('password') || (t('The passwords do not match') as string)
						})}
						type="password"
						name="confirm"
						label={t('Confirm password')}
						error={errors.confirm}
						placeholder="********"
					/>

					<Field
						register={register({ required })}
						type="text"
						name="username"
						label={t('Username')}
						error={errors.username}
						placeholder="JohnSmith"
					/>
				</div>

				<div className="c-form__col">
					<Field
						register={register({ required })}
						type="text"
						name="first_name"
						label={t('First name')}
						error={errors.first_name}
						placeholder="John"
					/>

					<Field
						register={register({ required })}
						type="text"
						name="last_name"
						label={t('Last name')}
						error={errors.last_name}
						placeholder="Smith"
					/>

					<Field
						register={register({ required })}
						type="select"
						options={[t('Unspecified'), t('Male'), t('Female')]}
						name="gender"
						label={t('Gender')}
						error={errors.gender}
					/>

					<Field
						register={register()}
						type="url"
						name="image_url"
						label={t('Avatar image URL')}
						error={errors.image_url}
						placeholder="https://images.com/john-smith.jpg"
					/>
				</div>
			</div>

			{!!signupError && <p className="c-form__error c-form__error--api">{signupError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				{t('Sign up')}
			</Button>

			{props.children}
		</form>
	);
};

export default SignupForm;
