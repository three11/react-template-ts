import * as React from 'react';

import './index.scss';

interface Props {
	readonly type?: 'submit' | 'reset' | 'button';
	readonly children?: any;
	readonly className?: string;
	readonly onClick?: (...args: any[]) => any;
	readonly [x: string]: any;
}

export const Button: React.FunctionComponent<Props> = (props: Props) => {
	const { type, children, className, onClick, ...rest } = props;
	const classes: string[] = className ? className.split(' ') : [''];
	const classNames: string = ['c-btn'].concat(classes).join(' ');

	return (
		<button className={classNames} type={type} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default Button;
