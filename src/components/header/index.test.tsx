import * as React from 'react';
import { render } from '@testing-library/react';

import { Header } from '.';
import { initialState } from '@store/branches/auth/reducer';
import { TestStoreProvider } from '@components';

test('Header component should render successfully', () => {
	const { asFragment } = render(
		<TestStoreProvider
			state={{
				auth: {
					...initialState
				}
			}}
		>
			<Header />
		</TestStoreProvider>
	);

	expect(asFragment()).toMatchSnapshot();
});
