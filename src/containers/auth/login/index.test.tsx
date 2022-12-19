import * as React from 'react';
import { render } from '@testing-library/react';

import { Login } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('Login component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<Login />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
