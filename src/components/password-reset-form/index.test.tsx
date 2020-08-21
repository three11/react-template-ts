import * as React from 'react';
import { shallow } from 'enzyme';

import { PasswordResetForm } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(() => ({
		loading: false,
		passwordResetError: ''
	}))
}));

describe('PasswordResetForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<PasswordResetForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
