import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';

import { RootState } from '@store/interfaces';

interface Props {
	state: Partial<RootState>;
	children: string | React.ReactNode | React.ReactNode[];
}

export const TestStoreProvider: React.FC<Readonly<Props>> = ({ state, children }: Props) => (
	<Provider store={configureMockStore()(state)}>
		<MemoryRouter>{children}</MemoryRouter>
	</Provider>
);

export default TestStoreProvider;
