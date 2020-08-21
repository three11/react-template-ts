import * as React from 'react';
import { shallow } from 'enzyme';

import { PasswordReset } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

describe('PasswordReset component', () => {
	it('should render successfully', () => {
		const tree = shallow(<PasswordReset />);

		expect(tree).toMatchSnapshot();
	});
});
