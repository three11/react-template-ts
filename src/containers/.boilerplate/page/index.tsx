import * as React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

export const Page: React.FunctionComponent = () => {
	const { t } = useTranslation();

	return <div>{t('Boilerplate')}</div>;
};

export default Page;
