import * as React from 'react';
import { format } from 'date-fns';

import './index.scss';

export const Footer: React.FunctionComponent = () => (
	<footer className="c-footer">
		<div className="o-shell">
			<p>&copy; {format(new Date(), 'yyyy')}. All rights reserved.</p>
		</div>
	</footer>
);

export default Footer;
