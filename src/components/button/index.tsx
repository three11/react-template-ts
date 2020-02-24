import * as React from 'react';

import './index.scss';

interface Props {
	readonly type?: 'submit' | 'reset' | 'button';
	readonly children?: React.ReactChild[] | React.ReactText;
	readonly className?: string;
	readonly onClick?: (...args: any[]) => any;
	readonly [x: string]: any;
}

export const Button = (props: Props): React.ReactElement<HTMLButtonElement> => {
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
