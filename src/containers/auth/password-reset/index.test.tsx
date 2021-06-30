import * as React from 'react';
import { shallow } from 'enzyme';

import { PasswordReset } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities', () => ({
	useAppSelector: jest.fn(),
	Routes: {
		BASE: '/',
		ABOUT: '/about',
		LOGIN: '/login',
		SIGNUP: '/signup',
		SETTINGS: '/settings',
		PASSWORD_RESET: '/reset-password'
	}
}));

describe('PasswordReset component', () => {
	it('should render successfully', () => {
		const tree = shallow(<PasswordReset />);

		expect(tree).toMatchSnapshot();
	});
});
