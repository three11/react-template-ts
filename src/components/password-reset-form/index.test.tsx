import * as React from 'react';
import { render } from '@testing-library/react';

import { initialState } from '@store/branches/auth/reducer';
import { PasswordResetForm } from '.';
import { TestStoreProvider } from '@components';

test('PasswordResetForm component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<PasswordResetForm onSubmit={(): jest.Mock => jest.fn()} />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
