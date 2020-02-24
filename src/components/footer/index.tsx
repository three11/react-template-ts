import * as React from 'react';
import * as moment from 'moment';

import './index.scss';

export const Footer: React.FunctionComponent = () => (
	<footer className="c-footer">
		<div className="o-shell">
			<p>&copy; {moment().format('YYYY')}. All rights reserved.</p>
		</div>
	</footer>
);

export default Footer;
