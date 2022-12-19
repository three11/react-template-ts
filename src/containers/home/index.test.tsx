import * as React from 'react';
import { render } from '@testing-library/react';

import { Home } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('Home component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<Home />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
