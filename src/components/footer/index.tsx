import * as React from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { i18n, locales } from '@i18n';
import { AuthActionType } from '@containers/auth/enums';

import './index.scss';

// codebeat:disable[LOC]
export const Footer: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentLang = i18n.language;

	const onLanguageChange = (locale: string) => {
		dispatch({
			type: AuthActionType.SET_LOCALE_REQUEST,
			payload: { locale }
		});
	};

	return (
		<footer className="c-footer">
			<div className="o-shell">
				<p>
					&copy; {format(new Date(), 'yyyy')}. {t('All rights reserved.')}
				</p>

				<p>
					Change language:
					{[...locales, 'en'].map((locale: string, index: number) => (
						<button key={index} onClick={() => onLanguageChange(locale)} disabled={currentLang === locale}>
							{locale}
						</button>
					))}
				</p>
			</div>
		</footer>
	);
};
// codebeat:enable[LOC]

export default Footer;
