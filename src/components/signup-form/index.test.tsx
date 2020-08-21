import * as React from 'react';
import { shallow } from 'enzyme';

import { SignupForm } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(() => ({
		loading: false,
		signupError: ''
	}))
}));

describe('SignupForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<SignupForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
