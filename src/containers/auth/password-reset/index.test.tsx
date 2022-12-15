import * as React from 'react';
import { render } from '@testing-library/react';

import { initialState } from '@store/branches/auth/reducer';
import { PasswordReset } from '.';
import { TestStoreProvider } from '@components';

test('PasswordReset component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<PasswordReset />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
