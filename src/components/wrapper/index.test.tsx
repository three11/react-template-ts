import * as React from 'react';
import { render } from '@testing-library/react';

import { Wrapper } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('Wrapper component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider state={{ auth: { ...initialState } }}>
			<Wrapper>Test content</Wrapper>
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
