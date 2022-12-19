import * as React from 'react';
import { render } from '@testing-library/react';

import { NotFound } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('NotFound component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<NotFound />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
