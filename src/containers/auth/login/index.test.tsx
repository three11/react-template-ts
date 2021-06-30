import * as React from 'react';
import { shallow } from 'enzyme';

import { Login } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities/hooks', () => ({
	useAppSelector: jest.fn()
}));

describe('Login component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Login />);

		expect(tree).toMatchSnapshot();
	});
});
