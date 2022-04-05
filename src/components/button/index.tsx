import * as React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

interface Props {
	as?: React.ElementType;
	to?: string;
	children?: any;
	className?: string;
	href?: string;
	[x: string]: any;
}

export const Button: React.FunctionComponent<Readonly<Props>> = ({
	as: As = 'button',
	to,
	href,
	children,
	className,
	...rest
}: Props) => {
	const linkProps = !!to ? { to } : !!href ? { href } : {};
	const HTMLElement = !!to ? Link : !!href ? 'a' : As;

	return (
		<HTMLElement className={`c-btn ${className}`} {...linkProps} {...rest}>
			{children}
		</HTMLElement>
	);
};

export default Button;
