import * as React from 'react';
import { shallow } from 'enzyme';

import { PasswordResetForm } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn()
}));

jest.mock('@src/utilities/hooks', () => ({
	useAppSelector: jest.fn(() => ({
		loading: false,
		loginError: ''
	}))
}));

describe('PasswordResetForm component', () => {
	it('should render successfully', () => {
		const tree = shallow(<PasswordResetForm onSubmit={(): jest.Mock => jest.fn()} />);

		expect(tree).toMatchSnapshot();
	});
});
