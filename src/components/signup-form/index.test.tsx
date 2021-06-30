import * as React from 'react';
import { shallow } from 'enzyme';

import { SignupForm } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities', () => ({
	useAppSelector: jest.fn(() => ({
		loading: false,
		signupError: ''
	})),
	Routes: {
		BASE: '/',
		ABOUT: '/about',
		LOGIN: '/login',
		SIGNUP: '/signup',
		SETTINGS: '/settings',
		PASSWORD_RESET: '/reset-password'
	}
}));
describe('SignupForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<SignupForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
