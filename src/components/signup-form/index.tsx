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

export const SignupForm: React.FunctionComponent<Props> = (props: Props) => {
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

					<Field
						register={register({
							validate: (value: string) => value === watch('password') || 'The passwords do not match'
						})}
						type="password"
						name="confirm"
						label="Confirm password"
						error={errors.confirm}
						placeholder="********"
					/>

					<Field
						register={register({
							required: 'This field is required.'
						})}
						type="text"
						name="username"
						label="Username"
						error={errors.username}
						placeholder="ShortWhale"
					/>
				</div>

				<div className="c-form__col">
					<Field
						register={register({
							required: 'This field is required.'
						})}
						type="text"
						name="first_name"
						label="First name"
						error={errors.first_name}
						placeholder="John"
					/>

					<Field
						register={register({
							required: 'This field is required.'
						})}
						type="text"
						name="last_name"
						label="Last name"
						error={errors.last_name}
						placeholder="Smith"
					/>

					<Field
						register={register({
							required: 'This field is required.'
						})}
						type="select"
						options={['Unspecified', 'Male', 'Female']}
						name="gender"
						label="Gender"
						error={errors.gender}
					/>

					<Field
						register={register()}
						type="url"
						name="image_url"
						label="Avatar image URL"
						error={errors.image_url}
						placeholder="https://images.com/john-smith.jpg"
					/>
				</div>
			</div>

			{!!signupError && <p className="c-form__error c-form__error--api">{signupError}</p>}

			<Button type="submit" disabled={loading} className={loading ? 'c-btn--loading' : ''}>
				Sign up
			</Button>

			{props.children}
		</form>
	);
};

export default SignupForm;
