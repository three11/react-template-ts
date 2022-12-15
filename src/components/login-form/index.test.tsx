import * as React from 'react';
import { render } from '@testing-library/react';

import { LoginForm } from '.';
import { TestStoreProvider } from '@components';
import { initialState } from '@store/branches/auth/reducer';

test('LoginForm component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<LoginForm onSubmit={(): jest.Mock => jest.fn()} />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
