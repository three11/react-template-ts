import * as React from 'react';

import './index.scss';

interface Props {
	type?: string;
	children?: any;
	className?: string;
	onClick?: any;
}

export const Button = (props: Props): React.ReactElement<HTMLButtonElement> => {
	const { type, children, className, onClick } = props;
	const classes: string[] = className ? className.split(' ') : [''];
	const classNames: string = ['c-btn'].concat(classes).join(' ');

	return (
		<button className={classNames} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
