import * as React from 'react';
import { render } from '@testing-library/react';

import { Signup } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('Signup component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<Signup />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
