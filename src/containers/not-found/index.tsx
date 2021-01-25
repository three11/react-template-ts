import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from '@components';

import './index.scss';

export const NotFound: React.FunctionComponent = () => {
	const { t } = useTranslation();

	return (
		<Wrapper>
			<div className="c-not-found">
				404
				<br />
				{t('Page not found')}
			</div>
		</Wrapper>
	);
};

export default NotFound;
