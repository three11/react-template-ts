import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from '@components/wrapper';

export const Home: React.FunctionComponent = () => {
	const { t } = useTranslation();

	return <Wrapper>{t('Homepage')}</Wrapper>;
};

export default Home;
