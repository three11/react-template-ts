import * as React from 'react';
import { render } from '@testing-library/react';

import { SignupForm } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('SignupForm component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<SignupForm onSubmit={(): jest.Mock => jest.fn()} />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
