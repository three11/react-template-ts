import * as React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from '@components';

jest.mock('react-inlinesvg');
jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(() => ({
		loading: false,
		loginError: ''
	}))
}));

describe('LoginForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<LoginForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
