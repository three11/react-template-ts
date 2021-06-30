import * as React from 'react';
import { shallow } from 'enzyme';

import { PasswordResetForm } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities', () => ({
	useAppSelector: jest.fn(() => ({
		loading: false,
		passwordResetError: ''
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
describe('PasswordResetForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<PasswordResetForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
