import * as React from 'react';

interface Props {
	readonly type: string;
	readonly name: string;
	readonly label: string;
	readonly error: any;
	readonly options?: string[];
	readonly register: any;
	readonly placeholder?: string;
}

export const Field: React.FunctionComponent<Props> = ({
	type,
	name,
	label,
	error,
	options,
	register,
	placeholder
}: Props) => (
	<div className={`c-form__field c-form__field--${type}${error ? ' c-form__field--error' : ''}`}>
		<header className="c-form__field-head">
			<label htmlFor={name}>{label}</label>

			{error && <p className="c-form__error">{error.message}</p>}
		</header>

		{type === 'select' ? (
			<select id={name} {...register} name={name}>
				{!!options &&
					options.map((option: string, key: number) => (
						<option value={option} key={key}>
							{option}
						</option>
					))}
			</select>
		) : type === 'textarea' ? (
			<textarea id={name} {...register} name={name} placeholder={placeholder} cols={30} rows={10}></textarea>
		) : (
			<input id={name} {...register} type={type} name={name} placeholder={placeholder} />
		)}
	</div>
);

export default Field;
