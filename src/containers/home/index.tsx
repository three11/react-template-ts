import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from '@components';

export const Home: React.FunctionComponent = () => {
	const { t } = useTranslation();

	return (
		<Wrapper>
			<div className="o-shell">{t('Homepage')}</div>
		</Wrapper>
	);
};

export default Home;
