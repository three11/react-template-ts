import * as React from 'react';

import { Wrapper } from '@components/wrapper';

import './index.scss';

export const NotFound = (): React.ReactElement<any> => (
	<Wrapper>
		<div className="c-not-found">
			404 <br />
			Page not found
		</div>
	</Wrapper>
);

export default NotFound;
